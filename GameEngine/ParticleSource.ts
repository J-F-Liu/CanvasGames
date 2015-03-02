class ParticleSource extends GameObjectGroup {
    constructor(public createParticle: () => Particle) {
        super();
    }

    generate(): Particle {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].visible == false) {
                return <Particle>this.objects[i];
            }
        }
        var particle = this.createParticle();
        this.add(particle);
        return particle;
    }

    emit() {
        var particle = this.generate();
        particle.emit();
    }
}