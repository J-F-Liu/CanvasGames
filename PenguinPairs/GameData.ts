class GameData {
    static directions = {
        "east": 0, "north": 1, "west": 2, "south": 3,
        0: "east", 1: "north", 2: "west", 3: "south"
    };
    static levels = [
        {
            "tip": "Click on a penguin and select the arrow to let it move towards the other penguin.",
            "goal": 1,
            "hint_arrow_x": 4,
            "hint_arrow_y": 3,
            "hint_arrow_direction": 3,
            "tiles": [
                "#########",
                "#.......#",
                "#...r...#",
                "#.......#",
                "#.......#",
                "#.......#",
                "#...r...#",
                "#.......#",
                "#########"
            ]
        },
        {
            "tip": "Don't let the penguins fall in the water!",
            "goal": 1,
            "hint_arrow_x": 3,
            "hint_arrow_y": 1,
            "hint_arrow_direction": 2,
            "tiles": [
                "#.......#",
                "#...r...#",
                "#.......#",
                "#.     .#",
                "#.     .#",
                "#.     .#",
                "#.......#",
                "#...r...#",
                "#.......#"
            ]
        },
        {
            "tip": "The order in which you move the penguins matters.",
            "goal": 1,
            "hint_arrow_x": 8,
            "hint_arrow_y": 1,
            "hint_arrow_direction": 2,
            "tiles": [
                "    #######",
                "    #....r.",
                "    #.#####",
                "    #.#    ",
                "    #.#    ",
                "#####.#####",
                ".r.........",
                "###########"
            ]
        },
        {
            "tip": "Create multiple pairs. The number of required pairs is indicated at the top.",
            "goal": 5,
            "hint_arrow_x": 3,
            "hint_arrow_y": 4,
            "hint_arrow_direction": 0,
            "tiles": [
                "..y....",
                ".y...y.",
                ".......",
                ".y...y.",
                "..y.y..",
                ".......",
                ".y.....",
                ".....y.",
                "..y...."
            ]
        },
        {
            "tip": "Pair each penguin with a similar one.",
            "goal": 2,
            "hint_arrow_x": 5,
            "hint_arrow_y": 6,
            "hint_arrow_direction": 1,
            "tiles": [
                ".......",
                ".b...b.",
                ".......",
                ".r.....",
                ".......",
                ".......",
                ".......",
                ".....r.",
                "......."
            ]
        },
        {
            "tip": "Animals sometimes must be sacrificed to arrange all required pairs.",
            "goal": 2,
            "hint_arrow_x": 1,
            "hint_arrow_y": 4,
            "hint_arrow_direction": 2,
            "tiles": [
                " ...  ",
                "..r.. ",
                "..... ",
                "..b..#",
                "..g.. ",
                "..b..#",
                "..... ",
                "..r.. ",
                " ...  "
            ]
        },
        {
            "tip": "Multi-colored penguins pair with any penguin.",
            "goal": 2,
            "hint_arrow_x": 4,
            "hint_arrow_y": 3,
            "hint_arrow_direction": 0,
            "tiles": [
                "  ...  ",
                " ..r.. ",
                " ..... ",
                " ..b..#",
                "#..m.. ",
                " ..b..#",
                " ..... ",
                " ..g.. ",
                "  ...  "
            ]
        },
        {
            "tip": "Use the seals to stop the penguins from moving.",
            "goal": 1,
            "hint_arrow_x": 5,
            "hint_arrow_y": 4,
            "hint_arrow_direction": 1,
            "tiles": [
                ".......",
                ".....s.",
                ".s.s...",
                ".......",
                "...s...",
                ".....b.",
                ".......",
                "..b....",
                "......."
            ]
        },
        {
            "tip": "Use all the penguins to pair the blue penguins.",
            "goal": 1,
            "hint_arrow_x": 4,
            "hint_arrow_y": 1,
            "hint_arrow_direction": 2,
            "tiles": [
                ".......",
                ".g...r.",
                ".......",
                ".....b.",
                ".......",
                ".y...p.",
                ".......",
                "...b...",
                "......."
            ]
        },
        {
            "tip": "The penguin in the trap cannot move.",
            "goal": 1,
            "hint_arrow_x": 5,
            "hint_arrow_y": 2,
            "hint_arrow_direction": 1,
            "tiles": [
                ".......",
                ".....s.",
                ".s.....",
                ".....s.",
                ".......",
                ".s...r.",
                "..s....",
                "...R...",
                "......."
            ]
        },
        {
            "tip": "Catch the penguin in the trap.",
            "goal": 1,
            "hint_arrow_x": 5,
            "hint_arrow_y": 4,
            "hint_arrow_direction": 3,
            "tiles": [
                ".......",
                ".......",
                ".......",
                ".r..Xs.",
                ".......",
                ".......",
                ".......",
                "...r...",
                ".....s."
            ]
        },
        {
            "tip": "Use the seals to get the sharks out of the way in order to make the pair.",
            "goal": 1,
            "hint_arrow_x": 5,
            "hint_arrow_y": 4,
            "hint_arrow_direction": 3,
            "tiles": [
                ".......",
                "...p...",
                ".......",
                ".s.@.s.",
                "...@...",
                "...@...",
                ".@...s.",
                ".s.p...",
                "......."
            ]
        },
        {
            "tip": "",
            "goal": 3,
            "hint_arrow_x": 7,
            "hint_arrow_y": 7,
            "hint_arrow_direction": 1,
            "tiles": [
                "   ###   ",
                "   #g#   ",
                "####.####",
                "#r..X..b#",
                "####.####",
                "####.####",
                "#...p...#",
                "#.##.##.#",
                "#y##.##o#",
                "#g##b##r#",
            ]
        },
        {
            "tip": "",
            "goal": 1,
            "hint_arrow_x": 1,
            "hint_arrow_y": 0,
            "hint_arrow_direction": 0,
            "tiles": [
                "b.........r",
                ".o...s.....",
                "........s..",
                "...s.......",
                "@....@s...@",
                "....@b@....",
                "..s..@.....",
                ".......s...",
                "p..........",
                ".....s...g."
            ]
        },
        {
            "tip": "",
            "goal": 7,
            "hint_arrow_x": 5,
            "hint_arrow_y": 3,
            "hint_arrow_direction": 1,
            "tiles": [
                "...........",
                "..b..@..b..",
                "..r.@.@.r..",
                "..@.....@..",
                "..y..s..y..",
                "..g..X..g..",
                "..@.....@..",
                "..p.m m.p..",
                "..o.r.g.o..",
                "...........",
            ]
        }
    ];
}