//dot flag
let dot_flag = false;

//equals flag
let equal_flag = false;

//adding empty expression to the div
let display_expression = document.getElementById('display_expression');
display_expression.innerHTML = '';

//result div
let display_result = document.getElementById('display_result');

//button list
let click_button = document.getElementsByTagName('button');

//button events
for (let i = 0; i < click_button.length; i++)
{
    click_button[i].addEventListener("click", ()=>{
        calculator_operations(click_button[i]);
    });// enend of events
}
//key press events
window.addEventListener('keydown', (pressed_key)=>
{
    if(pressed_key.key.match(/[0-9]|[-]|[+]|[x]|[/]|[%]|[.]|[=]/))
    {
        for(let i = 0; i < click_button.length; i++)
        {
            if(click_button[i].innerHTML === pressed_key.key)
            {
                calculator_operations(click_button[i]);
                calculator_css(click_button[i]);
            }
        }
    }
    else if(pressed_key.key.match(/[*]|[X]/))
    {
        for(let i = 0; i < click_button.length; i++)
        {
            if(click_button[i].innerHTML === 'x')
            {
                calculator_operations(click_button[i]);
                calculator_css(click_button[i]);
            }
        }
    }
    else if(pressed_key.key === 'Backspace' || pressed_key.key === 'Delete')
    {
        for(let i = 0; i < click_button.length; i++)
        {
            if(click_button[i].innerHTML === 'CE')
            {
                calculator_operations(click_button[i]);
                calculator_css(click_button[i]);
            }
        }
    }
    else if(pressed_key.key === 'Enter')
    {
        for(let i = 0; i < click_button.length; i++)
        {
            if(click_button[i].innerHTML === '=')
            {
                calculator_operations(click_button[i]);
                calculator_css(click_button[i]);
            }
        }
    }
    else if(pressed_key.key === 'Escape')
    {
        for(let i = 0; i < click_button.length; i++)
        {
            if(click_button[i].innerHTML === 'AC')
            {
                calculator_operations(click_button[i]);
                calculator_css(click_button[i]);
            }
        }
    }
});

//calculator operations
function calculator_operations(button_clicked)
{
    let display_expression = document.getElementById('display_expression');
    let data = display_expression.innerHTML;

    // event AC
    if(button_clicked.innerHTML === 'AC')
    {
        display_expression.innerHTML = '';
        display_result.innerHTML = '0';
    }
    //event of CE
    else if(button_clicked.innerHTML === 'CE')
    {
        let expression = '';
        data = display_expression.innerHTML;
        for(let i = 0; i < data.length - 1; i++)
        {
            expression = expression + data[i];
        }
        display_expression.innerHTML = expression;
    }
    // event numbers
    else if(button_clicked.innerHTML.match(/[0-9]/))
    {
        if(data)
        {
            if(equal_flag === false)
            {
                if (!data[data.length - 1].match(/[%]/))
                {
                    data = data + button_clicked.innerHTML;
                    display_expression.innerHTML = data;
                }
            }
            else if(equal_flag === true)
            {
                display_expression.innerHTML = button_clicked.innerHTML;
                equal_flag = false;
            }
        }
        else if(!data)
        {
            data = data + button_clicked.innerHTML;
            display_expression.innerHTML = data;
        }
    }
    //event + and -
    else if(button_clicked.innerHTML.match(/[-]|[+]/))
    {
        if(data)
        {
            if(equal_flag === false)
            {
                if (!data[data.length - 1].match(/[.]/))
                {
                    data = data + button_clicked.innerHTML;
                    display_expression.innerHTML = data;
                    dot_flag = false;
                }
            }
            else  if (equal_flag === true)
            {
                data = display_result.innerHTML + button_clicked.innerHTML;
                display_expression.innerHTML = data;
                dot_flag = false;
                equal_flag = false;
            }
        }
        else if(!data)
        {
            data = data + button_clicked.innerHTML;
            display_expression.innerHTML = data;
            dot_flag = false;
        }
    }
    //event x and /
    else if(button_clicked.innerHTML.match(/[/]|[x]/))
    {
        if(data)
        {
            if(equal_flag === false)
            {
                if (!data[data.length - 1].match(/[/]|[x]|[.]|[-]|[+]/))
                {
                    data = data + button_clicked.innerHTML;
                    display_expression.innerHTML = data;
                    dot_flag = false;
                }
            }
            else if(equal_flag === true)
            {
                data = display_result.innerHTML + button_clicked.innerHTML;
                display_expression.innerHTML = data;
                dot_flag = false;
                equal_flag = false;
            }
        }
    }
    //event %
    else if(button_clicked.innerHTML.match(/%/))
    {
        if(data)
        {
            if(equal_flag === false)
            {
                if(data[data.length - 1].match(/[0-9]/))
                {
                    data = data + button_clicked.innerHTML;
                    display_expression.innerHTML = data;
                }
            }
            else if(equal_flag === true)
            {
                data = display_result.innerHTML + button_clicked.innerHTML;
                display_expression.innerHTML = data;
                dot_flag = false;
                equal_flag = false;
            }

        }
    }
    //event .
    else if(button_clicked.innerHTML.match(/[.]/))
    {
        if(data)
        {
            if(data[data.length - 1].match(/[0-9]/) && dot_flag === false)
            {
                data = data + button_clicked.innerHTML;
                display_expression.innerHTML = data;
                dot_flag = true;
            }
        }
    }
    else if(button_clicked.innerHTML.match(/[=]/))
    {
        if(data)
        {
            if(!data[data.length - 1].match(/[-]|[+]|[x]|[/]/))
            {
                let expression = '';
                for(let i = 0 ; i < data.length; i++)
                {
                    if(data[i].match(/[0-9]|[/]|[.]|[+]|[-]/))
                    {
                        expression = expression + data[i];
                    }
                    else if(data[i].match(/[%]/))
                    {
                        expression = expression + '/100';
                    }
                    else if(data[i].match(/[x]/))
                    {
                        expression = expression + '*';
                    }
                }
                display_result.innerHTML = eval(expression);
                equal_flag = true;
            }
        }
    }
}
//css on key press hover flash
function calculator_css(key_pressed)
{
    key_pressed.classList.add(key_pressed.classList[0] + '-hover');
    window.setTimeout(()=>{
        key_pressed.classList.remove(key_pressed.classList[0] + '-hover');
    },100);
}
//detail icon
document.getElementById('detail_icon').addEventListener('mouseover', ()=>{
    document.getElementById('detail_description').classList.remove('hidden');
});
document.getElementById('detail_icon').addEventListener('mouseout', ()=>{
    document.getElementById('detail_description').classList.add('hidden');
});
