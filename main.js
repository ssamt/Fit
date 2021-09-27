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

function show_alert(s) {
    document.getElementById("alert").innerText = s
}

function hide_alert() {
    document.getElementById("alert").innerText = ""
}

function set_var() {
    temp_a = Number(document.getElementById("a_input").value);
    temp_b = Number(document.getElementById("b_input").value);
    if(temp_a < 0) {
        show_alert("a cannot be smaller than 0!")
    } else if(temp_b < 1) {
        show_alert("b cannot be smaller than 1!")
    } else if(Number.isInteger(temp_a) && Number.isInteger(temp_b)) {
        if(temp_a+temp_b <= gold[stage]) {
            a = temp_a
            b = temp_b
            hide_alert()
            calculate()
        } else {
            show_alert("You do not have enough gold!")
        }
    } else {
        show_alert("Variables should be integers!")
    }
}

function next_stage() {
    stage++
    document.getElementById("next_stage").className = "btn disabled"
    x = 0
    document.getElementById("x").innerHTML = cut_decimal(x, 2)
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
        document.getElementById("next_stage").className = "waves-effect waves-light btn"
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

document.getElementById("inputs").addEventListener("keyup", enter)

function enter(event) {
    if(event.key === "Enter") {
        document.getElementById("set").click()
    }
}

let a = 0
let b = 1
let dx
let x = 1
let bar = 0
let tick = 1
let stage = 0
let gold = [10, 100, 10000]
let goal = [150, 15000, 5e+8]
calculate()
let main_loop = setInterval(step, tick*1000)
