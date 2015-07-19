class GameData {
    static tileWidth = 40;
    static tileHeight = 28;
    static titleScreen = {
        "initX": 300,
        "initY": 308,
        "walls": true,
        "background": "sky_green",
        "treeColor": "green",
        "groundColor": "green",
        "tiles": [
            "                ",
            "                ",
            "                ",
            "                ",
            "                ",
            "                ",
            "           ^    ",
            "   ^       |    ",
            "   |  ^    |^   ",
            "   |^ |    ||   ",
            "qp |qp|    ||qp ",
            "~~~~~~~~~~~~~~~~",
            "________________"
        ]
    };
    static level1 = {
        "initX": 100,
        "initY": 308,
        "background": "sky_blue",
        "treeColor": "yellow",
        "groundColor": "yellow",
        "pipeColor": "green",
        "woodColor": "red",
        "brickColor": "red",
        "waterfallColor": "white",
        "tiles": [
            "                                                                         .....                                                 UUUUU[]UUUU       R                                  ",
            "                                                       R  ^          *         %                                                  UU[]UU         $       ooo                        ",
            "     ^            ^                        o           $  | ^    #? #?         $$               ^                           ^       []        ^         U C U      ^        ^       ",
            "     | ^        ^ |            ^           o             ^| |               ^        U K U      |     oooo                  |^      []        |         UUUUU      |   ^    | ^     ",
            "    ^| |        | |            |     ##### o             || |               |        UUUUU      |                            |      -a        |                   ^|   |   ^| |     ",
            "    || |  G     | |            |           o     +aG     || |               |            UK  U  |                           ||           W    |        ooooooo    ||   |   || |     ",
            "    || | ??     | |            |           o     []?     || |   ?# ?#       |            UUUUU  |  W             W  Q   G   || oooo      +1   |       U     C U   ||   |   || | ++  ",
            "    || |     -1 | |       []   |  ##       o     []      || |               |   U  KU           |  [] $$$$$[]   J[] ? ###   ||           []   |       UUUUUUUUU   ||   X   || | []  ",
            "    || |     [] | |       []   |               [][]      || |               |   UUUUU        G  |  []      []    []         ||           []   |                   ||   |   || | []  ",
            "    || |     [] | |       []   |               [][]      || |               |                $  |  [] C    []    []         ||           []   |                   ||   |   ||K| []  ",
            "p   || |qp   [] | |   Cqp []   |qvpCC  F     K [][] qp   || | K    C   C    |                 qp|  [] qp C [] qpK[]  qp I   ||  qpK  Kqp [] qp|  F F qvp          |qp K|   qvp| []qp",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~}!!!{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~}!{~~~}!!!!!!!!!!!!!!{~~~~~~~~~~~~~~~~~~~~~~~~~}!!{~~~~~~~~~~~~~~~~~~~}!!!!!{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
            "_____________________________________)!!!(_______________________________)!(___)!!!!!!!!!!!!!!(_________________________)!!(___________________)!!!!!(______________________________"
        ]
    };
    static level1a = {
        "initX": 90,
        "initY": 140,
        "background": "wall_brown",
        "woodColor": "yellow",
        "pipeColor": "green",
        "tiles": [
            "U[]UUUUUUUUUUUUU",
            "U[]n  n  n  n  U",
            "U[]            U",
            "U-a  o o o     U",
            "U   o o o  []$ U",
            "U          []  U",
            "UUUUUUUUUUUUU  U",
            "U  n  n  n  n  U",
            "U             $U",
            "U  +a o o o o  U",
            "U  []  o o o o U",
            "U  []          U",
            "UUU[]UUUUUUUUUUU"
        ]
    };
    static level2 = {
        "initX": 90,
        "initY": 140,
        "background": "wall_brown",
        "groundColor": "brown",
        "woodColor": "red",
        "pipeColor": "yellow",
        "brickColor": "yellow",
        "waterfallColor": "red",
        "tiles": [
            "H    #############   HHHHH     HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH       G  K                                          HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH            HH",
            "H    .............   HHHHHI   IHH                                        H    #############                           oo                                                         HHHHHHHHHHHHHH            HH",
            "H                    HHHHH     HH                           ooooooooo  W H                                  Q        o  o       U   K                                            HHHHHHHHHHHHHH            HH",
            "H                    HHHHH     HH     W                     ooooooooo  +1H                                  ?                   UUUUU     oooo                                   HHHHHHHHHHHHHH            HH",
            "H         W                                                        C C []H%        W              G                                                W                             HHHHHHHHHHHHHHR  ooooo    HH",
            "H            G                        []     HHHHHHH HHHHH HHHHHHHHHHH []H$   W                 []?                -1    W             U U   CU    []                            HHHHHHHHHHHHHH?  ooooo  ++HH",
            "H       W []??                        []                               HHH    +a   []         +2[]        -aG      []    []UUUUUUUUUUUUU UUUUUU    []                     ++%    HHHHHHHHHHHHHH   ooooo  []HH",
            "H         []  W                     -2[]                                      []   []    W    [][]        []?  W   []    []                      W []                     []?    HHHHHHHHHHHHHH   ooooo  []HH",
            "H       [][]                        [][]                                      []   []   U[]   [][]        []   []  []    [] oooo                 [][]                     []     HHHHHHHHHHHHHH X        []HH",
            "H       [][]  []          K         [][]                                      []   []    []   [][]II II II[]   []  []    [] oooo                 [][]                X    []     HHHHHHHHHHHHHH x        []HH",
            "H       [][]  []         II O II    [][]         K  O     O                 K []   []    []   [][]  O  O  []   []  [] OO []             O        [][]  II O II O II  x  K [] CC  HHHHHHHHHHHHHHHHHHHHHHHHHHHH",
            "HHHHHHHHHHHHHHHHHH!!!HHHHH!!!!!HHHHHHHHH  JHHHHHHHH!!!HHH!!!HHHHHHHHHHHHHHHHHHHH!!!HH!!!!HH!!!HHHH!!!!!!!HHHHHHHHHHHH!!!!HHHHHHHH!!!HHHH!HHHHHHHHHHHHHHHH!!!!!!!!HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
            "HHHHHHHHHHHHHHHHHH!!!HHHHH!!!!!HHHHHHHHH   HHHHHHHH!!!HHH!!!HHHHHHHHHHHHHHHHHHHH!!!HH!!!!HH!!!HHHH!!!!!!!HHHHHHHHHHHH!!!!HHHHHHHH!!!HHHH!HHHHHHHHHHHHHHHH!!!!!!!!HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
        ]
    };
    static level2a = {
        "initX": 240,
        "initY": 240,
        "background": "wall_brown",
        "groundColor": "brown",
        "woodColor": "red",
        "pipeColor": "yellow",
        "brickColor": "yellow",
        "tiles": [
            "HHHHH[][]     [][]HHHHH[]HHHH",
            "H    [][]     [][]     []   H",
            "H oo [][]HHHHH[][]     []  GH",
            "H oo []-a       [] ooo []  ?H",
            "H oo []         [] ooo +a   H",
            "HK   []            ooo      H",
            "HHH  []            ooo      H",
            "H          W       ooo W    H",
            "H          []          []  =H",
            "H  W    K  []          []   H",
            "H  []HHHH[][]      K W []   H",
            "H  []    [][]  []HHHH[][]   H",
            "H  []    [][]  []    [][]   H"
        ]
    };
    static level3 = {
        "initX": 100,
        "initY": 308,
        "background": "sky_blue",
        "groundColor": "wheat",
        "treeColor": "yellow",
        "woodColor": "red",
        "pipeColor": "silver",
        "brickColor": "yellow",
        "tiles": [
            " G                               K              G  K             K                               IIIIII[]IIII                                     R      {~",
            " ?              ooo            ooo            ?????    oooo    ooo    oooo          []             .  .[].  .     ooo             $   $ {~~}  ?????????  (_",
            "        K       {~}            {~}                     ####    {~}    ####          []     K           []         {~}        ^$         (__)             (_",
            "     ^ II       (_)o        ^  (_)oo                 ^         (_)         ^        []    II           []     ^   (_)        | ^        (__) X           (_",
            "   K |      K   (__}        |  (__~}           K     |         (_)         |    K?  IIII                      |  o(_)     $ ^| |        (__) x qpK       (_",
            "  II |      II  (__)        |  (___)                 |         (_)         | IIIII                W           |  {__)       || |        (__) {~~~}     K (_",
            "     |          (__)        | o(___)    W     ????? J|         (_)JJJ      |                      []          |  (__)Kqp    || |    ++  (__) (___) ++ {} (_",
            "     |         o(__)        | {____)    []           |        o(_)         |              G qvp   []W         | o(__{~~}    X| |    []  (___~~}__) [] () (_",
            "     |         {___)        | (____)    []           |        {__)    W    |            []??{~~}  [][]        | {___(__)    || |    []  (_____)__) [] () (_",
            "     |         (___) G      | (____)  W []           |M       (__)    []   |          W []  (__)  [][]        | (___(___}   || |    []  (______}_) [] () (_",
            " qp  |         (qp_) ?      | (_qp_)M [][]  qvp      |I    qpM(__)  M []   |       R  [][] M(__)M [][]  qp    |K(__{____)   || |Kqvp[]  (______)_) [] () (_",
            "~~~~~~}     {~~~~~~~~}    []{~~~~~~~~}[][]  {~~~~~~~~~}    {~~~~~~~~~}[]  J|M     M?  [][]{~~~~~~}[][]{~~}   {~~~~~______~~~~~~~~~~~~~} (_______~~~~~~~~~__",
            "______)     (________)    [](________)[][]  (_________)    (_________)[]  {~~~~~~~~}  [][](______)[][](__)   (________________________) (__________________"
        ]
    };
    static level4 = {
        "initX": 100,
        "initY": 308,
        "background": "sky_blue",
        "groundColor": "green",
        "treeColor": "green",
        "pipeColor": "brown",
        "xblockColor": "red", 
        "tiles": [
            "                                                                                                 R             G                               o                     ",
            "                                                                                                 $             ?                            o  o                     ",
            "                                      G                              oooo                                                                o  o  o                     ",
            "                          ooo        ???                                           K  -a  G       Q  /`                                  o  o                        ",
            "                                                            /`                     NN []  ??      $  </`                                 o     K                     ",
            "                       W           ^         ^ K     W      <>     W         K        []             <<>       K                            K  N              ^      ",
            "      ^             ^ %+1  ^       |         | N  K  -1    /`>     +a    []  NN       []             <<>       N      []                 K  N  N             ^|  ++  ",
            "     ^|      []    ^| ?[]  |   [] ^| ???    K|^   N  []    <>>^    []    [] ^    K    []           $ <<>^    K N      [][]               N  N                ||  []  ",
            "     ||    [][]    ||^ []  |   [] ||        N||      [] ^  <>>|    []  [][] |^  NN ^  [] ^^         ^<<>|    N N[]    [][] ^             N ^   ^  []  ^      ||  []  ",
            "     ||    [][]    ||| [] ^|   [] || ^   K   ||    ^ [] |^ <>>| ^  []  [][] ||    ^|  [] ||         |<<>|  K N N[]    [][] |^          ^   |  ^|  []  | X    ||^ []  ",
            "     || qp [][] Kqp||| [] ||K  [] ||^|   N   || qp |^[] || <>>|K|qp[]  [][] ||    ||  [] ||K        |<<>|  N N N[] qp [][] ||      qpK |^  |  ||^ [] ^| xqvpK||| []  ",
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~}  {~~~~~~~~~}  {~~~~~~~~~~~~~~~~~~~~~~~}  {~~~~~~~~~~~~} {~~~~~~}     {~~~~~~~~~~~~~} {~~~~~~~~~}   {~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
            "____________________________)  (_________)  (_______________________)  (____________) (______)     (_____________) (_________)   (___________________________________"
        ]
    };
    static level4a = {
        "initX": 920,
        "initY": 80,
        "background": "wall_brown",
        "groundColor": "brown",
        "woodColor": "red",
        "pipeColor": "yellow",
        "brickColor": "yellow",
        "xblockColor": "brown",
        "tiles": [
            "NNNNNNNNNNNNNNNNNNNNNN[]NNNNNNNNNNNNNNNNNNNNNNN",
            "N                     []                      N",
            "N ooooo               -a   ooooo           oo N",
            "N ooooo                              K        N",
            "N                                    NNN      N",
            "N       NNNNN       NNNNN                     N",
            "N       N                           K      +a N",
            "NN  N  NN ?G               NNNNN   NNN     [] N",
            "N       N  ?                               [] N",
            "N       N       J                          [] N",
            "NAAAAAAAN                C                 [] N",
            "HHHHHHHHHHHHHYYYHYYYHHHHHHHHHHHHYYYHHHHHHHHHHHH",
            "HHHHHHHHHHHHHYYYHYYYHHHHHHHHHHHHYYYHHHHHHHHHHHH"
        ]
    };
    static level5 = {
        "initX": 100,
        "initY": 308,
        "background": "sky_blue",
        "groundColor": "green",
        "treeColor": "green",
        "brickColor": "yellow",
        "woodColor": "yellow",
        "pipeColor": "red",
        "tiles": [
            "              G                                                                                                                              ",
            "              ?                                       K  {}           ooo   ooo                                 ooooo                        ",
            "                          oooo                      {~~~~_)                                    W W    %               W                      ",
            "                     ^                              (_____)             ^                J J   +a[]   ?               []W         ^          ",
            "        ^      ###  ^|                      W       (_____)            ^|                      [][]         ^         [][]        |   ^      ",
            " ^      |^          || W         W    G     +1   ^  (_____)K      ^ K R|| K   Q K     K        [][]      ^  |         [][]       ^|   |^     ",
            " |^   ^ || ###      || -1        []   ???   []   |^ (____{~~}     | U $|| U   $ U   UUU       UUUUUU     | ^| UJJJJJJJUUUUJ      || ^ || ++  ",
            " ||   | ||        qp|| []      [][]     ^^  []   || (____(__)     | U  || U     U                        | || U                  || | || []  ",
            " ||   | ||       M{~~~}[]   ^  [][]    ^||  []  ^|| (___{___) qp  |^U  || U   ^ U^^             ^        | || UR                 || | || []  ",
            " ||   | ||     {~~_____~~}M |^ [][]    |||  []  ||| (___(___)~~~~}||U  || U   |^U||             |^       | || U?               X || | || []  ",
            " ||   | ||qpM{~___________} || [][] Kqp|||  []  |||M(qp_(___)____)||Uqp||MUqpM||U|| qp  J J J M ||Mqp J  | || U      qp   qvpU xM|| | ||M[]  ",
            "~~~~~~~~~~~~~______________~~~~~~~~~~~~~~~~~~~~~~~~~~~~~____)__{~~~~~~~~~~~~~~~~~~~~~~}       {~~~~~}   {~~~~~}  {} M{}M  {~~~~~~~~~~~~~~~~~~",
            "_____________________________________________________________~~________________________}     {_______} {______) {__~~__~~~___________________"
        ]
    };
    static level5a = {
        "initX": 120,
        "initY": 80,
        "background": "sky_blue",
        "groundColor": "brown",
        "treeColor": "green",
        "pipeColor": "red",
        "xblockColor": "red", 
        "tiles": [
            "        o                   G           o         ",
            "       ooo                  ?          ooo        ",
            "       ooo                             ooo        ",
            "        o                               o         ",
            "                 {~~~~~}                          ",
            "  -a ^       M{~~______)                          ",
            "  [] |^ J ^ {~_____qp__)       ^            ^ +1  ",
            "  [] ||  ^| (_____{~~}__~~} J ^|  J  ^  J  ^| []  ",
            "  [] ||  || (_____(__)____)   ||     |   ^ || []  ",
            "  [] ||qp||M(_____(__)____)  ^|| K   |   | || []  ",
            "~~~~~~~~~~~~~}qvp_(___}___)M ||| N M | qp|M|| []  ",
            "______________~~~~____)___{~~~~~~~~~~~~~~~~~~~~~~~",
            "_______________________~~~________________________"
        ]
    };
    static level6 = {
        "initX": 120,
        "initY": 80,
        "background": "wall_brown",
        "groundColor": "gray",
        "pipeColor": "coffee",
        "tiles": [
            "HHHHHH    HHHHHHHHHHH HHH    HHHHHHHHHHHHHHHHH      HHHHHH   HHHHHHH      HHHIIIIIHHVV              IIHHHHHHHHHHHIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
            "HHHHH      HHII                                     HHHHHH   HHHHHHH      HHH VVV                    V   IIHHHHHHI                zz                                                                     I",
            "             VV                                     HHHHHH   HHHHHHH      HHH                            VV     HI                zz                ooooo o   o ooooo   ooooo o   o oooo   o o           I",
            "                                        M           HHHHHH   HHHHHHH      HHH                                   II        IIIIIIIIIz                  o   o   o o       o     oo  o o   o  o o           I",
            "                                     G              HHHHHH   HHHHHHH      HHH                              R    HI        IHHHHHHHI                   o   o   o o       o     o o o o   o  o o           I",
            "                                     ???                                            +a                     ?  +aHI        IHHHHHHHI        GG         o   ooooo oooo    oooo  o  oo o   o  o o           I",
            "                                                                                    []      DD                []HI      -1IHHHHHHHI        ??         o   o   o o       o     o   o o   o  o o           I",
            "                                              M                  K                 A[]            D           []HI      []IHHHHHHHI                   o   o   o o       o     o   o o   o           ++   I",
            "               IHHHHH HHI    IHHI          IHHI    IHHHHHH D HHHHHHHI    IHHHH   HHH[]                        []HI      []IHHHHHHHI                   o   o   o ooooo   ooooo o   o oooo   o o      []   I",
            "HHHHHI DD IHH  HHHHHH HHH    HHIIA         HHH      HHHHHH   HHHHHHHH    HHHHH   HHI[]                   A    []HI      []IHHHHHHHI   X                                                             []   I",
            "HHHHHH    HHHAAHHHHHH HHH    HHHHHHHHHHH  HHHHAAAAAAHHHHHH   HHHHHHHHAAAAHHHHH O HHHIIA         A    DD  IHHIIIIHI      []IHHHHHHHI   x                                                             []   I",
            "HHHHHHYYYYHHHIIHHHHHHYHHHYYYYHHHHHHHHHHHYYHHHHHHHHHHHHHHHHYYYHHHHHHHHIIIIHHHHHYYYHHHHIIA        I        HHHHIIHHIYYYYYY[]IHHHHHHHIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIH",
            "HHHHHHYYYYHHHHHHHHHHHYHHHYYYYHHHHHHHHHHHYYHHHHHHHHHHHHHHHHYYYHHHHHHHHHHHHHHHHHYYYHHHHHHIA       I        HHHHHHHHHYYYYYY[]IHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
        ]
    };
    static level6a = {
        "initX": 120,
        "initY": 80,
        "background": "wall_brown",
        "groundColor": "gray",
        "pipeColor": "silver",
        "brickColor": "red",
        "tiles": [
            "HHHHHH[]HHHHH          G                                          HHHHHHHHHHHHHHHHHHHHHHHHHHVVVVVVVVVVVVVVVVVVHHHHHHH",
            "H     []               ???                                        IHHHHHHHHHHHHHHHHHHHHHHHHH                  HHHHHHH",
            "H     -a                                                                    HHHHHHHHHHHHHHHH                  HHHHHHH",
            "H                                                 %                         HHHHHHHHHHHHHHHI                 GHHHHHHH",
            "H                                                 ?                 -2      HHHHHH    HHHHHH                 $HHHHHHH",
            "H                                                                   []HHHI  HHHHHH    HHHHHI    IHHHHHHHHHHI  HHHHHHH",
            "H                            #  K #                                 []HHHH  HHHHHHQ   HHHHII    HHHHHHHH      HHHHHHH",
            "H                            #AAAA#      W              W           []HHHH  IHHHHI?   HHHII    #HHHHHHHH      HHHHHHH",
            "H                    #  K #[]######      []W            []        [][]HHHH                    R#HHHHHHHH      HHHHHHH",
            "H#  K ## K  #        #AAAA#[]#    #      []+2           []    K   [][]HHHH                    ##HHHHHHHH+1    HHHHHHH",
            "HHHHHHHHHHHHH  J  J  ######[]#    #[]  II[][]II D D II[][]AAAAAAAA[][]HHHH      K  K  Y       ##HHHHHHHH[]HHHHHHHHHHH",
            "HHHHHHHHHHHHH        #    #[]#    #[]    [][]         [][]HHHHHHHHHHHHHHHH  HHHHHHHHHIIHHHHHHHHHHHHHHHHH[]HHHHHHHHHHH",
            "HHHHHHHHHHHHH        #    #[]#    #[]    [][]         [][]HHHHHHHHHHHHHHHH  HHHHHHHHHHHHHHHHHHHHHHHHHHHH[]HHHHHHHHHHH"
        ]
    };
}