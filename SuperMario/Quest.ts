class Quest extends AnimatedSprite{
    constructor(public tile:Tile, public award:string){
        super({
            'active': GameWorld.sprites.quest,
            'solved': Animation.Create(GameWorld.sprites.block)
        }, 'active');
        this.position = tile.position;
    }

    reset() {
        this.animation = 'active';
    }
    
    get height(): number {
        return this.image.height + 2;
    }
    
    update(frameSpan) {
        super.update(frameSpan);
        if(GameWorld.player.velocity.y < 0 && this.collideWith(GameWorld.player)){
            this.animation = 'solved';
        }
    }
}