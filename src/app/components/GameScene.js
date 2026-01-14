'use client';

import { useEffect, useRef } from 'react';

export default function GameScene({ era, character, onInteract, onPuzzleStart, onReturn }) {
  const gameRef = useRef(null);
  const phaserGameRef = useRef(null);
  const onInteractRef = useRef(onInteract);

  // Use a ref to track keys globally to bypass focus/Phaser input issues
  const keysPressed = useRef({});

  // Keep callback ref updated
  useEffect(() => {
    onInteractRef.current = onInteract;
  }, [onInteract]);

  useEffect(() => {
    // 1. Global Input Listeners (Robustness fix)
    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    if (!gameRef.current || !era || !character) return cleanup;

    let PhaserInstance = null;
    let resizeObserver = null;

    // Dynamically import Phaser
    import('phaser').then((Phaser) => {
      PhaserInstance = Phaser.default || Phaser;

      class EraScene extends PhaserInstance.Scene {
        constructor() {
          super({ key: 'EraScene' });
        }

        preload() {
          // Preload NPC images
          const npcImages = {
            'ancient-egypt': '/nebet.jpg',
            'medieval-europe': '/william.jpg',
            'renaissance': '/leonardodavinci.jpg',
            'space-age': '/armstrong.jpg',
            'early-apple': '/stevejobs.jpg'
          };

          if (npcImages[era?.id]) {
            this.load.image(`${era?.id}-npc`, npcImages[era?.id]);
          }

          // Preload Player Image
          if (character && character.image) {
            this.load.image('player-avatar', character.image);
          }
        }

        create() {
          this.npcs = [];
          this.nearNPC = null;
          this.spaceKeyDebounce = false;

          const width = this.cameras.main.width;
          const height = this.cameras.main.height;

          // --- Create Environment ---
          this.createEnvironment(width, height);

          // --- Create Player ---
          if (this.textures.exists('player-avatar')) {
            this.player = this.add.image(100, height - 150, 'player-avatar');
            // Scale player
            const pScale = 64 / Math.max(this.player.width, this.player.height);
            this.player.setScale(pScale);
          } else {
            // Fallback player
            this.player = this.add.rectangle(100, height - 150, 48, 48, 0x4a9eff);
            this.player.setStrokeStyle(2, 0xffffff);
          }

          this.physics.add.existing(this.player);
          this.player.body.setCollideWorldBounds(true);

          // --- Create NPC ---
          const npcX = width - 200;
          const npcY = height - 150;

          let npc;
          const npcKey = `${era?.id}-npc`;

          // Check if key exists in cache
          if (this.textures.exists(npcKey)) {
            npc = this.add.image(npcX, npcY, npcKey);
            const scale = 96 / Math.max(npc.width, npc.height);
            npc.setScale(scale);
          } else {
            npc = this.add.rectangle(npcX, npcY, 50, 80, 0xff5555);
          }

          this.physics.add.existing(npc);
          npc.body.setImmovable(true);
          npc.name = era?.historicalFigure?.name || 'NPC';

          // Interaction System
          this.setupInteraction(npc);
          this.npcs.push(npc);

          // World Bounds
          this.physics.world.setBounds(0, 0, width, height);
        }

        createEnvironment(width, height) {
          const graphics = this.add.graphics();

          // Helper to draw random stars
          const drawStars = (count, color = 0xffffff, alpha = 0.8) => {
            graphics.fillStyle(color, alpha);
            for (let i = 0; i < count; i++) {
              const x = Math.random() * width;
              const y = Math.random() * (height - 100);
              const size = Math.random() * 2 + 1;
              graphics.fillCircle(x, y, size);
            }
          };

          if (era.id === 'ancient-egypt') {
            this.cameras.main.setBackgroundColor('#87CEEB'); // Sky Blue

            // Sun
            graphics.fillStyle(0xFFD700, 1);
            graphics.fillCircle(width - 100, 100, 60);

            // Pyramids
            graphics.fillStyle(0xDAA520, 1); // Goldenrod
            graphics.fillTriangle(width / 2, height - 100, width / 2 - 200, height - 100, width / 2 - 100, height - 400);
            graphics.fillStyle(0xCD853F, 1);
            graphics.fillTriangle(width / 2 + 300, height - 100, width / 2 + 100, height - 100, width / 2 + 200, height - 250);

            // Ground
            graphics.fillStyle(0xF4A460, 1); // Sandy Brown
            graphics.fillRect(0, height - 100, width, 100);

            // Palm Tree details
            graphics.lineStyle(8, 0x8B4513, 1);
            graphics.beginPath();
            graphics.moveTo(100, height - 100);
            graphics.lineTo(100, height - 250);
            graphics.strokePath();
            graphics.fillStyle(0x228B22, 1);
            graphics.fillCircle(100, height - 260, 40);

          } else if (era.id === 'medieval-europe') {
            this.cameras.main.setBackgroundColor('#87CEFA');

            // Hills
            graphics.fillStyle(0x2E8B57, 0.8);
            graphics.fillCircle(width / 4, height - 50, 300);
            graphics.fillCircle(width / 2 + 200, height - 50, 400);

            // Castle
            graphics.fillStyle(0x708090, 1);
            for (let i = 0; i < 10; i++) {
              graphics.fillRect(50 + i * 60, height - 250, 40, 150);
              graphics.fillRect(50 + i * 60 - 10, height - 270, 60, 20);
            }

            // Ground
            graphics.fillStyle(0x556B2F, 1);
            graphics.fillRect(0, height - 120, width, 120);

          } else if (era.id === 'renaissance') {
            this.cameras.main.setBackgroundColor('#E0FFFF');

            // Buildings
            graphics.fillStyle(0xF5F5DC, 1);
            graphics.fillRect(100, height - 400, 300, 400);
            graphics.fillRect(width - 400, height - 400, 300, 400);

            // Windows
            graphics.fillStyle(0x8B4513, 1);
            for (let i = 0; i < 3; i++) {
              graphics.fillRect(150, height - 350 + (i * 100), 60, 60);
              graphics.fillRect(250, height - 350 + (i * 100), 60, 60);
            }

            // Ground - Cobblestone
            graphics.fillStyle(0xA9A9A9, 1);
            graphics.fillRect(0, height - 100, width, 100);

            // Perspective lines
            graphics.lineStyle(2, 0x696969, 0.5);
            for (let i = 0; i < 20; i++) {
              graphics.beginPath();
              graphics.moveTo(i * 100, height - 100);
              graphics.lineTo(i * 150 - 500, height + 100);
              graphics.strokePath();
            }

          } else if (era.id === 'space-age') {
            this.cameras.main.setBackgroundColor('#000011');
            drawStars(100);

            // Earth
            graphics.fillStyle(0x1E90FF, 1);
            graphics.fillCircle(100, 100, 60);
            graphics.fillStyle(0x00FF00, 0.4);
            graphics.fillCircle(110, 90, 20);
            graphics.fillCircle(90, 110, 15);

            // Moon Ground
            graphics.fillStyle(0x808080, 1);
            graphics.fillRect(0, height - 120, width, 120);

            // Craters
            graphics.fillStyle(0x696969, 1);
            graphics.fillEllipse(300, height - 50, 100, 30);
            graphics.fillEllipse(700, height - 80, 60, 20);
          } else if (era.id === 'early-apple') {
            // Garage Wall Background
            this.cameras.main.setBackgroundColor('#D3D3D3'); // Light Gray

            // Wooden Shelves/Workbench
            graphics.fillStyle(0x8B4513, 1); // Brown Wood
            graphics.fillRect(50, height - 300, 200, 10); // Shelf 1
            graphics.fillRect(50, height - 350, 200, 10); // Shelf 2

            // Workbench table
            graphics.fillRect(width - 350, height - 200, 300, 20); // Table top
            graphics.fillRect(width - 340, height - 200, 20, 100); // Leg 1
            graphics.fillRect(width - 70, height - 200, 20, 100); // Leg 2

            // Electronics / Boxes
            graphics.fillStyle(0x556B2F, 1); // Dark Olive Green (Circuit boards?)
            graphics.fillRect(width - 300, height - 230, 60, 30);
            graphics.fillStyle(0xA52A2A, 1); // Brown Box
            graphics.fillRect(80, height - 100, 50, 50);

            // Poster on wall
            graphics.fillStyle(0xFFFFFF, 0.8);
            graphics.fillRect(width / 2 - 50, 100, 100, 150);
            graphics.fillStyle(0x000000, 0.2);
            graphics.fillRect(width / 2 - 40, 120, 80, 80); // Poster image placeholder

            // Ground - Concrete
            graphics.fillStyle(0x808080, 1);
            graphics.fillRect(0, height - 100, width, 100);
          } else {
            // Default
            this.cameras.main.setBackgroundColor('#333');
            graphics.fillStyle(0x222, 1);
            graphics.fillRect(0, height - 100, width, 100);
          }
        }

        setupInteraction(npc) {
          // Interaction Marker
          npc.interactionMarker = this.add.circle(npc.x, npc.y - 60, 10, 0xffff00, 1);
          npc.interactionMarker.setStrokeStyle(2, 0x000000);
          npc.interactionMarker.setVisible(false);

          // "!" Text
          const exclam = this.add.text(npc.x, npc.y - 75, '!', {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#000000'
          }).setOrigin(0.5).setVisible(false);
          npc.exclam = exclam;

          npc.showInteractionPrompt = (show) => {
            if (npc.interactionMarker) {
              npc.interactionMarker.setVisible(show);
              npc.exclam.setVisible(show);
              if (show) {
                this.tweens.add({
                  targets: [npc.interactionMarker, npc.exclam],
                  y: npc.y - 80,
                  duration: 500,
                  yoyo: true,
                  repeat: -1
                });
              } else {
                this.tweens.killTweensOf([npc.interactionMarker, npc.exclam]);
                npc.interactionMarker.y = npc.y - 60;
                npc.exclam.y = npc.y - 75;
              }
            }
          };

          // NPC Name Label
          const nameLabel = this.add.text(npc.x, npc.y + 60, npc.name, {
            fontFamily: '"Orbitron", "Arial", sans-serif',
            fontSize: '14px',
            fill: '#ffffff',
            backgroundColor: '#000000aa',
            padding: { x: 8, y: 4 },
            align: 'center'
          });
          nameLabel.setOrigin(0.5);
        }

        update() {
          if (!this.player) return;

          const speed = 300;
          this.player.body.setVelocity(0);

          // Read from GLOBAL keysPressed ref
          const keys = keysPressed.current;

          // WASD or Arrows
          const left = keys['KeyA'] || keys['ArrowLeft'];
          const right = keys['KeyD'] || keys['ArrowRight'];
          const up = keys['KeyW'] || keys['ArrowUp'];
          const down = keys['KeyS'] || keys['ArrowDown'];
          const space = keys['Space'];

          if (left) {
            this.player.body.setVelocityX(-speed);
            this.player.flipX = true; // Face left
          }
          else if (right) {
            this.player.body.setVelocityX(speed);
            this.player.flipX = false; // Face right
          }

          if (up) this.player.body.setVelocityY(-speed);
          else if (down) this.player.body.setVelocityY(speed);

          // Interaction Logic
          const interactionDistance = 150;
          let foundTarget = null;

          this.npcs.forEach((npc) => {
            const distance = PhaserInstance.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
            if (distance < interactionDistance) {
              foundTarget = npc;
              npc.showInteractionPrompt(true);
            } else {
              npc.showInteractionPrompt(false);
            }
          });

          this.nearNPC = foundTarget;

          // Space Key Debounce
          if (space && !this.spaceKeyDebounce) {
            if (this.nearNPC && onInteractRef.current) {
              onInteractRef.current(this.nearNPC);
            }
            this.spaceKeyDebounce = true;
          }
          if (!space) {
            this.spaceKeyDebounce = false;
          }
        }
      }

      const config = {
        type: PhaserInstance.CANVAS,
        width: gameRef.current.clientWidth || window.innerWidth,
        height: gameRef.current.clientHeight || window.innerHeight,
        parent: gameRef.current,
        transparent: true,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: EraScene,
        scale: {
          mode: PhaserInstance.Scale.RESIZE,
          autoCenter: PhaserInstance.Scale.NO_CENTER
        },
        input: {
          keyboard: true
        }
      };

      phaserGameRef.current = new PhaserInstance.Game(config);

      resizeObserver = new ResizeObserver((entries) => {
        if (phaserGameRef.current && entries[0]) {
          const { width, height } = entries[0].contentRect;
          if (width > 0 && height > 0) {
            phaserGameRef.current.scale.resize(width, height);
            const scene = phaserGameRef.current.scene.getScene('EraScene');
            if (scene && scene.physics) {
              scene.physics.world.setBounds(0, 0, width, height);
            }
          }
        }
      });

      if (gameRef.current) containerObserver(gameRef.current);
      resizeObserver.observe(gameRef.current);
    });

    function containerObserver(el) { }

    function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (resizeObserver) resizeObserver.disconnect();
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    }
  }, [era, character]);

  return (
    <div
      ref={gameRef}
      className="w-full h-full"
      style={{
        background: 'transparent',
        outline: 'none',
        touchAction: 'none'
      }}
    />
  );
}
