/*eslint-disable no-unused-lets*/
/*global window, $*/
let JSONAPI_MIMETYPE = 'application/vnd.api+json';

/**
 * Metadata group metadata input spinner
 * +/- 0.1 to the input value
 */
$('.number-spinner button').click(function() {
    let btn = $(this);
    let oldValue = parseFloat(btn.closest('.number-spinner').find('input').val().trim());
    let newVal = 0;
    if (!isNumber(oldValue)) {
        oldValue = 0;
    }
    if (btn.attr('data-dir') == 'up') {
        newVal = oldValue + 0.1;
    } else {
        newVal = oldValue - 0.1;
    }
    newVal = Math.min(1, Math.max(0, newVal));

    newVal = Math.round(newVal * 100) / 100;
    btn.closest('.number-spinner').find('input').val(newVal);
});

/**
 * Metadata input fields change
 * Checks if input is between 0 and 1 - if not it is set to 0 or 1
 */
$('.number-spinner input').on('input', function() {
    let input = $(this);
    let oldValue = input.val().trim();
    let newVal = 0;

    if (oldValue === '0.') {
        return;
    }

    oldValue = parseFloat(oldValue);

    if (isNumber(oldValue)) {
        newVal = Math.min(1, Math.max(0, oldValue));
    } else {
        newVal = 0;
    }
    input.val(newVal);
});

function isNumber(obj) {
    return !isNaN(parseFloat(obj));
}

/**
 * Get the suggested parameters from the backend
 */
$('#suggest').click(function() {
    // show the calculating button
    $(this).addClass('hidden');
    $('#calculating').removeClass('hidden');
    // get the data
    let dataset_id = $('#dataset_id').val();
    $.ajax({
        url: '/api/dataset/' + dataset_id + '/vc',
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Accept': JSONAPI_MIMETYPE
        },
        success: function(data) {
            // display the results
            for (let elm in data) {
                $('#' + elm).addClass('grey-background');
                $('#' + elm).val(Math.min(data[elm], 1));

            }
            // show the parameters button
            $('#suggest').removeClass('hidden');
            $('#calculating').addClass('hidden');

            window.setTimeout(function() {
                for (let elm in data) {
                    $('#' + elm).removeClass('grey-background');
                }
            }, 1000);

        }
    });

});
