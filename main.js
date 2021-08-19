function change_rate(a, b) {
    return 1/(Math.E-a/b)
}

function progress(x) {
    if(x >= 1) {
        return Math.log10(x)/8
    } else if(-1 < x && x < 1) {
        return 0
    } else {
        return -progress(-x)
    }
}

function cut_decimal(x, n) {
    return Math.round(x*Math.pow(10, n))/Math.pow(10, n)
}

function set_var() {
    a = document.getElementById("a_input").value;
    b = document.getElementById("b_input").value;
    calculate()
}

function calculate() {
    dx = change_rate(a, b)
    document.getElementById("a").innerHTML = a
    document.getElementById("b").innerHTML = b
    document.getElementById("dx").innerHTML = cut_decimal(dx, 2)
    document.getElementById("e_val").innerHTML = Math.E
    document.getElementById("a_div_b").innerHTML = a/b
    document.getElementById("end").innerHTML = Math.pow(10, 8)
}

function step() {
    x = x+dx*tick
    bar = progress(x)*100
    if(bar >= 100) {
        bar = 100
    }
    if(bar <= -100) {
        bar = -100
    }
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

let a = 14
let b = 5
let dx
calculate()
let x = 1
let bar = 0
let tick = 1
let main_loop = setInterval(step, tick*1000);