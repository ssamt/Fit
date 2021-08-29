function change_rate(a, b) {
    return 1/(Math.E-a/b)
}

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

function set_var() {
    a = Number(document.getElementById("a_input").value);
    if(a < 0) {
        a = 0
    }
    b = Number(document.getElementById("b_input").value);
    if(b < 1) {
        b = 1
    }
    if(a+b <= gold[stage]) {
        calculate()
    } else {
        alert("You do not have enough gold!")
    }
}

function next_stage() {
    stage++
    document.getElementById("next-stage").style.display = "none"
    calculate()
}

function calculate() {
    dx = change_rate(a, b)
    document.getElementById("a").innerHTML = a
    document.getElementById("b").innerHTML = b
    document.getElementById("dx").innerHTML = cut_decimal(dx, 2)
    document.getElementById("e_val").innerHTML = Math.E
    document.getElementById("a_div_b").innerHTML = a/b
    document.getElementById("end").innerHTML = goal[stage]
    document.getElementById("gold").innerHTML = gold[stage]
}

function step() {
    x = x+dx*tick
    bar = progress(x, goal[stage])*100
    if(bar >= 100) {
        bar = 100
        document.getElementById("next-stage").style.display = ""
    }
    if(bar <= -100) {
        bar = -100
    }
    document.getElementById("progress").innerHTML = cut_decimal(bar, 2)
    document.getElementById("x").innerHTML = cut_decimal(x, 2)
    if(bar >= 0) {
        document.getElementById("bar").style.width = bar+"%"
        document.getElementById("bar_bg").style.backgroundColor = "darkblue"
        document.getElementById("bar").style.backgroundColor = "steelblue"
    } else {
        document.getElementById("bar").style.width = (100+bar)+"%"
        document.getElementById("bar_bg").style.backgroundColor = "red"
        document.getElementById("bar").style.backgroundColor = "darkblue"
    }
}

let a = 0
let b = 1
let dx
let x = 1
let bar = 0
let tick = 1
let stage = 0
let gold = [10, 100, 1000]
let goal = [100, 1000, 10000]
calculate()
let main_loop = setInterval(step, tick*1000)
