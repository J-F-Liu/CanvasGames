class ScoreSheet {
    static add(score: number) {
        var scorelist = window.localStorage.getItem("scores");
        var scores = scorelist == null ? [] : JSON.parse(scorelist);
        var rank = 1;
        for (var i = 0; i < scores.length; i++) {
            if (scores[i][1] > score) {
                rank++;
            }
        }
        scores.push([new Date(Date.now()).toISOString(), score]);
        window.localStorage.setItem("scores", JSON.stringify(scores));
        return rank;
    }
} 