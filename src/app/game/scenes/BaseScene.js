// Base Phaser Scene for ChronoQuest

export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this.player = null;
    this.cursors = null;
    this.wasdKeys = null;
    this.npcs = [];
    this.interactionKey = null;
    this.nearNPC = null;
    this.eraData = null;
    this.onInteractCallback = null;
  }

  create() {
    // Create controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
    this.interactionKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Setup interaction key
    this.interactionKey.on('down', () => {
      if (this.nearNPC) {
        this.onInteractWithNPC(this.nearNPC);
      }
    });
  }

  update() {
    if (!this.player) return;

    // Movement using arrow keys or WASD
    const speed = 150;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
      this.player.setVelocityX(speed);
    } else if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
      this.player.setVelocityY(speed);
    }

    // Check for NPC interactions
    this.checkNPCProximity();
  }

  checkNPCProximity() {
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

  onInteractWithNPC(npc) {
    if (this.onInteractCallback) {
      this.onInteractCallback(npc);
    }
  }

  createPlayer(x, y, characterSprite) {
    // Create player sprite (simple colored rectangle for now, can be replaced with sprites)
    this.player = this.add.rectangle(x, y, 32, 32, 0x4a9eff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Add a visual indicator
    this.player.setStrokeStyle(2, 0xffffff);

    // Simple placeholder animations (just using the same frame for now)
    // In a full implementation, you'd load sprite sheets here
    return this.player;
  }

  createNPC(x, y, name, color = 0xff6b6b) {
    const npc = this.add.rectangle(x, y, 40, 40, color);
    this.physics.add.existing(npc);
    npc.body.setImmovable(true);
    npc.name = name;
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
    const nameLabel = this.add.text(npc.x, npc.y + 30, name, {
      fontSize: '14px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 2 },
    });
    nameLabel.setOrigin(0.5);

    this.npcs.push(npc);
    return npc;
  }
}
