class ScoreSheet extends GameSettings {

    maxScore: number = 0;
    scores: any[] = [];

    get storageKey() {
        return "PenguinPairsScores";
    }

    update(scoreData: any) {
        this.maxScore = scoreData.maxScore;
        this.scores = scoreData.scores;
    }

    add(score: number) {
        if (score > this.maxScore) {
            this.maxScore = score;
        }
        var rank = 1;
        for (var i = 0; i < this.scores.length; i++) {
            if (this.scores[i][1] > score) {
                rank++;
            }
        }
        this.scores.push([new Date(Date.now()).toISOString(), score]);
        this.save();
        return rank;
    }
} 