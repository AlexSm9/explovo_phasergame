// Music Button
// Button for muting/unmuting music
var MusicButton = function(game, music, x, y) {
   this.game = game;
   this.music = music;
   this.click1 = this.game.add.audio('click1');
   this.click2 = this.game.add.audio('click2');
    
   // add in mute/unmute music button
   this.musicButton = (isMute ? this.game.add.button(x, y, 'MusicButtons', this.muteMusic, this, 'music-button-off2', 'music-button-off') : this.game.add.button(x, y, 'MusicButtons', this.muteMusic, this, 'music-button-on2', 'music-button-on'));
   this.musicButton.anchor.set(0.5);
   this.musicButton.scale.setTo(0.4);
   this.musicButton.fixedToCamera = true;
   this.musicButton.setSounds(this.click1, '', this.click2, '');
};

MusicButton.prototype = Object.create(Phaser.Button.prototype);
MusicButton.prototype.constructor = MusicButton;

MusicButton.prototype.muteMusic = function() {
   //if music is mute, unmute. Else, mute it.
   isMute ? (isMute = false, this.music.volume = .7, this.musicButton.setFrames('music-button-on2', 'music-button-on')) : (isMute = true, this.music.volume = 0, this.musicButton.setFrames('music-button-off2', 'music-button-off'));
};