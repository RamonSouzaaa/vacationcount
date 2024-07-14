class DiffData
{
    #data;
    #weeks;
    #days;
    #hours;
    #minutes;
    #seconds;
    
    constructor(ref) {
        this.setData(ref);
    }

    #setDiff()
    {
        this.#seconds = Math.floor((this.#data - new Date()) / 1000);
        this.#minutes = Math.floor(this.#seconds / 60);
        this.#hours = Math.floor(this.#minutes / 60);
        this.#days = Math.floor(this.#hours / 24);
        this.#weeks = Math.floor(this.#days / 7);

    }

    setData(ref)
    {
        if(typeof(ref) === "string")
        {    
            let d = new Date(ref);
            this.#data = d.setDate(d.getDate() + 1);
        }
        else
        {
            this.#data = ref;
        }

        this.#setDiff();
    }

    getSeconds()
    {
        return this.#seconds;
    }

    getMinutes()
    {
        return this.#minutes;
    }

    getHours()
    {
        return this.#hours;
    }

    getDays()
    {
        return this.#days;
    }

    getWeeks()
    {
        return this.#weeks;
    }
}     

const diff = new DiffData(new Date());

function showContainer()
{
    let data = document.forms.formData.date.value;
    if(data == null || data === ''){
        return;
    }
    let d = new Date(`${data} 00:00:00`);
    diff.setData(d);
    showData();
    showConfetti();
}

function showData(){
    let op = parseInt(document.forms.typeData.typeShowData.value);
    
    switch(op){
        case 1:
            document.getElementById("showValue").children[0].innerHTML = `${diff.getWeeks()}`
            break;
        case 2:
            document.getElementById("showValue").children[0].innerHTML = `${diff.getDays()}`
            break;
        case 3:
            document.getElementById("showValue").children[0].innerHTML = `${diff.getHours()}`
            break;
        case 4:
            document.getElementById("showValue").children[0].innerHTML = `${diff.getMinutes()}`
            break;
        case 5:
            document.getElementById("showValue").children[0].innerHTML = `${diff.getSeconds()}`
            break;
        default: 
            document.getElementById("showValue").children[0].innerHTML = `${diff.getDays()}`
            break;
    }
}

function setDataForm()
{
    let dt = new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth()+1;
    let d = dt.getDate()+1;
    
    if(d.toString().length === 1)
        d = `0${d}`;
    if(m.toString().length === 1)
        m = `0${m}`;

    document.forms.formData.date.min = `${y}-${m}-${d}`;
    document.forms.formData.date.value = `${y}-${m}-${d}`;
}

function showConfetti ()
{
    const end = Date.now() + 15 * 1000;

    // go Buckeyes!
    const colors = ["#ff0d00", "#fff200", "#6aff00", "#00bbff", "#f700ff", "#ff8000"];

    (function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
    });

    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    })();
}
