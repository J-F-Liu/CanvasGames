class Maths {
    static even(n: number) {
        return n % 2 == 0;
    }

    static odd(n: number) {
        return n % 2 == 1;
    }

    static sign(value: number) {
        if (value > 0)
            return 1;
        else if (value < 0)
            return -1;
        else
            return 0;
    }

    static clamp(value: number, min: number, max: number) {
        if (value < min)
            return min;
        else if (value > max)
            return max;
        else
            return value;
    }
} 