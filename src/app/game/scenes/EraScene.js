// Era-specific Phaser Scene

export default class EraScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EraScene' });
  }

  init(data) {
    this.eraData = data.eraData;
    this.onInteractCallback = data.onInteract;
    this.onPuzzleStart = data.onPuzzleStart;
  }

  create() {
    // Create controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
    this.interactionKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.npcs = [];
    this.nearNPC = null;

    // Setup interaction key
    this.interactionKey.on('down', () => {
      if (this.nearNPC && this.onInteractCallback) {
        this.onInteractCallback(this.nearNPC);
      }
    });

    // Set background color based on era theme
    const bgColors = {
      'ancient-egypt': 0x8b4513,
      'medieval-europe': 0x556b2f,
      'renaissance': 0xd4af37,
      'space-age': 0x000033,
    };
    this.cameras.main.setBackgroundColor(bgColors[this.eraData?.id] || 0x2d3436);

    // Create player at starting position
    this.player = this.add.rectangle(100, 300, 32, 32, 0x4a9eff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.setStrokeStyle(2, 0xffffff);

    // Create historical figure NPC
    const npcX = this.cameras.main.width / 2;
    const npcY = this.cameras.main.height / 2;
    
    const npcColors = {
      'ancient-egypt': 0xd4af37,
      'medieval-europe': 0x8b4513,
      'renaissance': 0xff6b6b,
      'space-age': 0x4a9eff,
    };
    
    const npc = this.add.rectangle(
      npcX,
      npcY,
      40,
      40,
      npcColors[this.eraData?.id] || 0xff6b6b
    );
    this.physics.add.existing(npc);
    npc.body.setImmovable(true);
    npc.name = this.eraData?.historicalFigure?.name || 'NPC';
    npc.interactionPrompt = null;

    npc.showInteractionPrompt = (show) => {
      if (show && !npc.interactionPrompt) {
        npc.interactionPrompt = this.add.text(npc.x, npc.y - 50, 'Press SPACE to talk', {
          fontSize: '16px',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 8, y: 4 },
        });
        npc.interactionPrompt.setOrigin(0.5);
      } else if (!show && npc.interactionPrompt) {
        npc.interactionPrompt.destroy();
        npc.interactionPrompt = null;
      }
    };

    // Add name label
    const nameLabel = this.add.text(npc.x, npc.y + 30, npc.name, {
      fontSize: '14px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 2 },
    });
    nameLabel.setOrigin(0.5);

    this.npcs.push(npc);

    // Add era title
    if (this.eraData) {
      this.add.text(20, 20, `${this.eraData.name} - ${this.eraData.year}`, {
        fontSize: '24px',
        fill: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      });
    }

    // Add instructions
    this.add.text(20, this.cameras.main.height - 60, 'Arrow Keys / WASD: Move | SPACE: Interact', {
      fontSize: '14px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 },
    });
  }

  update() {
    if (!this.player) return;

    // Movement using arrow keys or WASD
    const speed = 150;
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
      this.player.body.setVelocityX(speed);
    }
    
    if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // Check for NPC interactions
    const interactionDistance = 50;
    this.nearNPC = null;

    this.npcs.forEach((npc) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        npc.x,
        npc.y
      );

      if (distance < interactionDistance) {
        this.nearNPC = npc;
        npc.showInteractionPrompt(true);
      } else {
        npc.showInteractionPrompt(false);
      }
    });
  }
}
