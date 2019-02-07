/*eslint-disable no-unused-lets*/
/*global $, Set*/
'use strict';
import './upload.css';

let inputVariablesBool = false;
let inputFilesBool = false;

//disable the submit button
triggerSubmitButton();
$('#upload-form').trigger('reset');

/**
 * Check input variables form card
 */
$('#input-variables-card').on('change', function() {
    let empty = $('#input-variables-card').find('input').filter(function() {
        return this.value === '';
    });
    // check if input is emtpy
    if (empty.length) {
        inputVariablesBool = false;
        $('#input-variables-card').removeClass('border-success');
        $('#input-variables-card').addClass('border-warning');
    } else {
        $('#input-variables-card').removeClass('border-warning');
        $('#input-variables-card').addClass('border-success');
        inputVariablesBool = true;
    }
    triggerSubmitButton();
});

/**
 * Upload form movement file
 */
$('#movement').on('change', function() {
    inputFilesBool = false;
    $('#movement-file-card').removeClass('border-success');
    $('#movement-file-card').addClass('border-warning');

    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        appendAlertWarning('Movement File', 'The file extension is not csv');
        return;
    }

    //check if csv file input is correct
    $('#movement').parse({
        config: {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            //  The callback to execute when parsing is complete
            complete: function completeFn(results) {
                // check if the header is correct
                // needed fields : id,time,x,y
                if (results.meta.fields.length >= 4) {
                    //needed fields
                    let needed_fields = ['animal_id', 'time', 'x', 'y'];
                    //fields of the csv file
                    let fields = results.meta.fields;
                    // compare the fields - this is case insensitive
                    for (let i = 0; i < needed_fields.length; i++) {
                        let query = needed_fields[i];
                        //if the field is missing
                        if (fields.findIndex(item => query === item) < 0) {
                            appendAlertWarning('Movement File', 'The file is missing the the header field ' + query);
                            return;
                        }
                    }
                } // not the correct number of fields in the csv file
                else {
                    appendAlertWarning('Movement File', 'The number of header fields is not correct');
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    appendAlertWarning('Movement File', 'ERROR:' + results.errors[0]['message']);
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    appendAlertWarning('Movement File', 'File seems to be emtpy');
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    if (!isNumber(results.data[i])) {
                        appendAlertWarning('Movement File', 'Something is wrong in CSV line ' + (i + 2));
                        return;
                    }
                }
                // get min max values for environment
                let minValues = [results.data[0]['x'], results.data[0]['y']];
                let maxValues = [results.data[0]['x'], results.data[0]['y']];
                //set min max values in the environment form fields
                for (let i = 0; i < results.data.length; i++) {
                    if (minValues[0] > results.data[i]['x']) {
                        minValues[0] = results.data[i]['x'];
                    }
                    if (minValues[1] > results.data[i]['y']) {
                        minValues[1] = results.data[i]['y'];
                    }
                    if (maxValues[0] < results.data[i]['x']) {
                        maxValues[0] = results.data[i]['x'];
                    }
                    if (maxValues[1] < results.data[i]['y']) {
                        maxValues[1] = results.data[i]['y'];
                    }
                }
                $('#min_x').val(minValues[0]);
                $('#min_y').val(minValues[1]);
                $('#max_x').val(maxValues[0]);
                $('#max_y').val(maxValues[1]);

                // great success
                $('#file-alerts').empty();
                inputFilesBool = true;
                $('#movement-file-card').removeClass('border-warning');
                $('#movement-file-card').addClass('border-success');
                $('#input-variables-card').change();
                triggerSubmitButton();
            },
            beforeFirstChunk: function(chunk) {
                //change the header to lowercase to make it case insensitive
                let rows = chunk.split(/\r\n|\r|\n/);
                let headings = rows[0].toLowerCase();
                rows[0] = headings;
                return rows.join('\r\n');
            },
        }
    });

});

/**
 * Upload form metadata file
 */
$('#metadata').on('change', function() {
    $('#reference-file-card').removeClass('border-success');
    $('#reference-file-card').addClass('border-warning');

    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        appendAlertWarning('Reference File', 'The file extension is not csv');
        return;
    }

    //check if csv file input is correct
    $('#metadata').parse({
        config: {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            //  The callback to execute when parsing is complete
            complete: function completeFn(results) {
                //needed fields
                let needed_fields = ['animal_id', 'species', 'sex', 'size', 'weight'];
                //fields of the csv file
                let fields = results.meta.fields;
                // check if the header is correct
                // needed fields : id,time,x,y
                if (results.meta.fields.length >= 5) {
                    // compare the fields - this is case insensitive
                    for (let i = 0; i < needed_fields.length; i++) {
                        let query = needed_fields[i];
                        //if the field is missing
                        if (fields.findIndex(item => query === item) < 0) {
                            appendAlertWarning('Reference File', 'The file is missing the header field: ' + query);
                            return;
                        }
                    }

                } // not the correct number of fields in the csv file
                else {
                    appendAlertWarning('Reference File', 'The file has not the correct number of header fields');
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    appendAlertWarning('Reference File', 'ERROR:' + results.errors[0]['message']);
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    appendAlertWarning('Reference File', 'The file seems to be empty');
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    //check if the id is a number
                    if (!letIsNumber(results.data[i]['animal_id'])) {
                        appendAlertWarning('Reference File', 'Something is wrong in CSV line ' + (i + 2));
                        return;
                    }
                    //check if there are also no empty or null values
                    for (let key in results.data[i]) {
                        if (results.data[i].hasOwnProperty(key)) {
                            if (!results.data[i][key]) {
                                appendAlertWarning('Reference File', 'Something is wrong in CSV line ' + (i + 2));
                                return;
                            }
                        }

                    }
                }

                // great success
                $('#file-alerts').empty();
                $('#reference-file-card').removeClass('border-warning');
                $('#reference-file-card').addClass('border-success');
                $('#input-variables-card').change();
            },
            beforeFirstChunk: function(chunk) {
                //change the header to lowercase to make it case insensitive
                let rows = chunk.split(/\r\n|\r|\n/);
                let headings = rows[0].toLowerCase();
                rows[0] = headings;
                return rows.join('\r\n');
            },
        }
    });
});

/**
 * Check if the image has the right img extension
 */
$('#background_image').on('change', function() {
    $('#background-image-card').removeClass('border-success');
    $('#background-image-card').addClass('border-warning');

    let fileExtension = ['png', 'jpg', 'jpeg'];
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        appendAlertWarning('Background image', 'Only formats are allowed : ' + fileExtension.join(', '));
    } else {
        $('#background-image-card').removeClass('border-warning');
        $('#background-image-card').addClass('border-success');
    }
});

/**
 * Trigger the sumbit button if all required inputs are correct
 */
function triggerSubmitButton() {
    if (inputVariablesBool && inputFilesBool) {
        $('input[type="submit"]').prop('disabled', false);
        $('input[type="submit"]').removeClass('btn-secondary');
        $('input[type="submit"]').addClass('btn-success');
    } else {
        $('input[type="submit"]').prop('disabled', true);
        $('input[type="submit"]').removeClass('btn-success');
        $('input[type="submit"]').addClass('btn-secondary');
    }
}

/**
 * Check if all object items are numbers and not NaN
 */
function isNumber(obj) {
    let solution = true;
    Object.keys(obj).forEach(function(key) {
        if (isNaN(parseFloat(obj[key]))) {
            solution = false;
        }
    });
    return solution;
}

/**
 * Check if object is number and not NaN
 */
function letIsNumber(obj) {
    return !isNaN(parseFloat(obj));
}


/**
 * Append alert to the alert div
 * @param {String} file - the file which contains the error
 * @param {String} text - alert text
 */
function appendAlertWarning(file, text) {
    $('#file-alerts').empty();
    $('#file-alerts').append('<div class="alert alert-warning" role="alert"><strong>' + file + ' :</strong> ' + text + ' </div>');
}

/**
 * Show the uploading icon after clicking on submit
 */
$('#submit').click(function() {
    $(this).hide();
    $('.submit-row').append('Please wait - files are upoaded');
});