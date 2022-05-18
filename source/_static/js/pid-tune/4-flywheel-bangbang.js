
class FlywheelBangBang extends FlywheelSim {

    constructor(div_id_prefix) {

        super(div_id_prefix);

        this.ctrl_Ts = 0.02;

        this.ctrlsInit();

    }

    ctrlsInit(){

        var curRow;
        var label;
        var control;
        var input;

        var ctrlTable =  document.createElement("table");
        ctrlTable.classList.add("controlTable");
        this.ctrlsDrawDiv.appendChild(ctrlTable);

        curRow = document.createElement("tr");
        label = document.createElement("td");
        label.innerHTML = "Setpoint";
        control = document.createElement("td");
        ctrlTable.appendChild(curRow);
        input = document.createElement("INPUT");
        input.setAttribute("type", "number");
        input.setAttribute("value", "1000.0");
        input.setAttribute("step", "100.0");
        input.onchange = function (event) {
            this.animationReset = true;
            this.setpointVal = parseFloat(event.target.value);
            this.runSim();
        }.bind(this);
        control.append(input)
        curRow.appendChild(label);
        curRow.appendChild(control);

        curRow = document.createElement("tr");
        label = document.createElement("td");
        label.innerHTML = "Inject Ball";
        control = document.createElement("td");
        ctrlTable.appendChild(curRow);
        input = document.createElement("INPUT");
        input.setAttribute("type", "checkbox");
        input.setAttribute("checked", true);
        input.onchange = function (event) {
            this.animationReset = true;
            this.injectBall = event.target.checked;
            this.runSim();
        }.bind(this);
        control.append(input)
        curRow.appendChild(label);
        curRow.appendChild(control);

    }

    controllerUpdate(time, setpoint, output){
        //bang-bang control
        if(output < setpoint){
            return 12.0;
        } else {
            return 0.0;
        }
    }

}
