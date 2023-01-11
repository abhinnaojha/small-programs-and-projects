let roman = document.querySelector("#roman");
let hindu = document.querySelector("#hindu");

//roman numerals to hindu-arabic
const roman_num = [];
roman_num['I'] = 1;
roman_num['V'] = 5;
roman_num['X'] = 10;
roman_num['L'] = 50;
roman_num['C'] = 100;
roman_num['D'] = 500;
roman_num['M'] = 1000;

const hindu_num = [1000, 500, 100, 50, 10, 5, 1];
const hindu_roman = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];

//replacing roman numerals like iiii with iv
function replace_roman()
{
    roman.value = roman.value.replace(/[^iIvVxXlLcCdDmM]/g, '');
    roman.value = roman.value.replace(/IIII/g, 'IV');
    roman.value = roman.value.replace(/VV/g, 'X');
    roman.value = roman.value.replace(/VIV/g, 'IX');
    roman.value = roman.value.replace(/XXXX/g, 'XL');
    roman.value = roman.value.replace(/LL/g, 'C');
    roman.value = roman.value.replace(/LXL/g, 'XC');
    roman.value = roman.value.replace(/CCCC/g, 'CD');
    roman.value = roman.value.replace(/DD/g, 'M');
    roman.value = roman.value.replace(/DCD/g, 'CM');
}
//calculate the equivalent roman from the hindu-arabic
//ui centric numerals
function calculate_roman()
{
    hindu.value = hindu.value.replace(/\D/g, '');

    let h_val = parseInt(hindu.value);
    let r_exp = '';
    let end_flag = 0;

    while(end_flag === 0 && !isNaN(h_val))
    {
        for(let i = 0; i < hindu_num.length; i++)
        {
            if(h_val >= hindu_num[i])
            {
                r_exp = r_exp + hindu_roman[i];
                h_val = h_val - hindu_num[i];
                roman.value = r_exp;
                replace_roman();
                break;
            }
        }
        if(h_val === 0)
        {
            end_flag = 1;
        }
    }
}
//fire event on receiving input on the roman textbox
roman.addEventListener('input', ()=>{
    roman.value = roman.value.toUpperCase();
    replace_roman();

    let roman_expression = roman.value.toUpperCase();
    let h_num = 0;

    for(let i = 0; i < roman_expression.length; i++)
    {
        if(roman_num[roman_expression[i]] < roman_num[roman_expression[i + 1]])
        {
            h_num = h_num + roman_num[roman_expression[i + 1]] - roman_num[roman_expression[i]];
            i++;
        }
        else
        {
            h_num = h_num + roman_num[roman_expression[i]];
        }

        hindu.value = h_num;
        calculate_roman();
    }
});
//fire event on change in hindu-arabic textbox
hindu.addEventListener('change', calculate_roman);
//fire event on receiving input in hindu-arabic textbox
hindu.addEventListener('input', calculate_roman);