function progress(x, goal) {
    if(-goal <= x && x <= goal) {
        return x/goal
    } else if(x < goal) {
        return -1
    } else {
        return 1
    }
}

function cut_decimal(x, n) {
    return Math.round(x*Math.pow(10, n))/Math.pow(10, n)
}

function show_alert(s) {
    document.getElementById("alert").innerText = s
}

function hide_alert() {
    document.getElementById("alert").innerText = ""
}

document.getElementById("enter").addEventListener("keyup", enter)

function enter(event) {
    if(event.key === "Enter") {
        document.getElementById("set").click()
    }
}

class Level {
    constructor() {
        this.dx = 0
        this.x = 1
        this.bar = 0
        this.tick = 1
        this.stage = 0
    }

    step() {
        this.x = this.x+this.dx*this.tick
        this.bar = progress(this.x, this.goal[this.stage])*100
        if(this.bar >= 100) {
            this.bar = 100
            document.getElementById("next_stage").className = "waves-effect waves-light btn"
        }
        if(this.bar <= -100) {
            this.bar = -100
        }
        document.getElementById("progress").innerHTML = cut_decimal(this.bar, 2)
        document.getElementById("x").innerHTML = cut_decimal(this.x, 2)
        if(this.bar >= 0) {
            document.getElementById("bar").style.width = this.bar+"%"
            document.getElementById("bar_bg").style.backgroundColor = "darkblue"
            document.getElementById("bar").style.backgroundColor = "steelblue"
        } else {
            document.getElementById("bar").style.width = (100+this.bar)+"%"
            document.getElementById("bar_bg").style.backgroundColor = "red"
            document.getElementById("bar").style.backgroundColor = "darkblue"
        }
    }

    run() {
        this.calculate()
        this.main_loop = setInterval(this.step.bind(this), this.tick*1000)
        document.getElementById(this.formulas_id).style.display = ""
        document.getElementById(this.inputs_id).style.display = ""
        document.getElementById(this.constraints_id).style.display = ""
    }

    end() {
        clearInterval(this.main_loop)
        document.getElementById(this.formulas_id).style.display = "none"
        document.getElementById(this.inputs_id).style.display = "none"
        document.getElementById(this.constraints_id).style.display = "none"
    }
}

class Level1 extends Level {
    constructor() {
        super();
        this.a = 0
        this.b = 1
        this.gold = [10, 100, 10000]
        this.goal = [150, 15000, 5e+8]
        this.max_stage = this.goal.length
        this.formulas_id = "level1_formulas"
        this.inputs_id = "level1_inputs"
        this.constraints_id = "level1_constraints"
    }

    change_rate(a, b) {
        return 1/(Math.E-a/b)
    }

    set_var() {
        let temp_a = Number(document.getElementById("a_input").value);
        let temp_b = Number(document.getElementById("b_input").value);
        if(temp_a < 0) {
            show_alert("a cannot be smaller than 0!")
        } else if(temp_b < 1) {
            show_alert("b cannot be smaller than 1!")
        } else if(Number.isInteger(temp_a) && Number.isInteger(temp_b)) {
            if(temp_a+temp_b <= this.gold[this.stage]) {
                this.a = temp_a
                this.b = temp_b
                hide_alert()
                this.calculate()
            } else {
                show_alert("You do not have enough gold!")
            }
        } else {
            show_alert("Variables should be integers!")
        }
    }

    next_stage() {
        this.stage++
        document.getElementById("next_stage").className = "btn disabled"
        this.x = 0
        document.getElementById("x").innerHTML = cut_decimal(this.x, 2)
        this.calculate()
    }

    calculate() {
        this.dx = this.change_rate(this.a, this.b)
        document.getElementById("a").innerHTML = this.a
        document.getElementById("b").innerHTML = this.b
        document.getElementById("dx").innerHTML = cut_decimal(this.dx, 2)
        document.getElementById("e_val").innerHTML = Math.E
        document.getElementById("a_div_b").innerHTML = this.a/this.b
        document.getElementById("end").innerHTML = this.goal[this.stage]
        document.getElementById("gold").innerHTML = this.gold[this.stage]
    }
}

level = 0
levels = [new Level1()]
levels[level].run()

function set_var() {
    levels[level].set_var()
}

function next_stage() {
    if(levels[level].stage === levels[level].max_stage-1) {
        levels[level].end()
        if(level === levels.length-1) {
            show_alert("End")
        } else {
            level++
            levels[level].run()
        }
    } else {
        levels[level].next_stage()
    }
}
