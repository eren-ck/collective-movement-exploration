/*eslint-disable no-unused-lets*/
/*global $, Set*/
'use strict';

//disable the submit button
disableSubmitButton();
$('#metadata').val('');
$('#movement').val('');

/**
 * Upload form movement file
 */
$('#movement').on('change', function() {
    //reset the movement alert fields
    changeAlertWarning('#movement-is-csv');
    changeAlertWarning('#movement-correct-fields');
    changeAlertWarning('#movement-file-correct');
    changeAlertWarning('#movement-primary-key');
    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        //disable the submit button
        disableSubmitButton();
        changeAlertDanger('#movement-is-csv');
        return;
    }

    // Enable submit button
    enableSubmitButton();

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
                            alert('The Movement CSV file is missing the field: ' + query);
                            disableSubmitButton();
                            changeAlertDanger('#movement-correct-fields');
                            return;
                        }
                    }

                } // not the correct number of fields in the csv file
                else {
                    changeAlertDanger('#movement-correct-fields');
                    disableSubmitButton();
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    alert('ERROR:' + results.errors[0]['message']);
                    disableSubmitButton();
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    changeAlertDanger('#movement-is-csv');
                    disableSubmitButton();
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    if (!isNumber(results.data[i])) {
                        alert('Something is wrong in CSV line ' + (i + 2));
                        disableSubmitButton();
                        changeAlertDanger('#movement-file-correct');
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

                // check for duplicate entries
                let seen = new Set();
                let hasDuplicates = results.data.some(function(current) {
                    return seen.size === seen.add(JSON.stringify({
                        pk1: current['time'],
                        pk2: current['animal_id']
                    })).size;
                });
                if (hasDuplicates) {
                    changeAlertDanger('#movement-primary-key');
                    disableSubmitButton();
                    return;
                }

                // great success
                changeAlertSuccess('#movement-is-csv');
                changeAlertSuccess('#movement-correct-fields');
                changeAlertSuccess('#movement-file-correct');
                changeAlertSuccess('#movement-primary-key');
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
    //reset the movement alert fields
    changeAlertWarning('#metadata-is-csv');
    changeAlertWarning('#metadata-correct-fields');
    changeAlertWarning('#metadata-file-correct');
    changeAlertWarning('#metadata-primary-key');
    // allowed extensions
    let fileExtension = ['csv'];
    // check if extension is csv, if not make an alert
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        //disable the submit button
        disableSubmitButton();
        changeAlertDanger('#metadata-is-csv');
        return;
    }

    if ($('#movement').val()) {
        // Enable submit button
        enableSubmitButton();
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
                            alert('The metadata CSV file is missing the field: ' + query);
                            disableSubmitButton();
                            changeAlertDanger('#metadata-correct-fields');
                            return;
                        }
                    }

                } // not the correct number of fields in the csv file
                else {
                    changeAlertDanger('#metadata-correct-fields');
                    disableSubmitButton();
                    return;
                }
                //check if there are errors
                if (results.errors.length !== 0) {
                    alert('ERROR:' + results.errors[0]['message']);
                    disableSubmitButton();
                    return;
                }
                //check if empty
                if (results.data.length === 0) {
                    changeAlertDanger('#metadata-is-csv');
                    disableSubmitButton();
                    return;
                }

                // check if there are just numbers in the csv
                // and if there are no empty values
                for (let i = 0; i < results.data.length; i++) {
                    //check if the id is a number
                    if (!letIsNumber(results.data[i]['animal_id'])) {
                        alert('Something is wrong in CSV line ' + (i + 2));
                        disableSubmitButton();
                        changeAlertDanger('#metadata-file-correct');
                        return;
                    }
                    //check if there are also no empty or null values
                    for (let key in results.data[i]) {
                        if (results.data[i].hasOwnProperty(key)) {
                            if (!results.data[i][key]) {
                                alert('Something is wrong in CSV line ' + (i + 2));
                                disableSubmitButton();
                                changeAlertDanger('#metadata-file-correct');
                                return;
                            }
                        }

                    }
                }
                // check for duplicate entries
                let seen = new Set();
                let hasDuplicates = results.data.some(function(current) {
                    return seen.size === seen.add(current['animal_id']).size;
                });
                if (hasDuplicates) {
                    changeAlertDanger('#metadata-primary-key');
                    disableSubmitButton();
                    return;
                }

                // great success
                changeAlertSuccess('#metadata-is-csv');
                changeAlertSuccess('#metadata-correct-fields');
                changeAlertSuccess('#metadata-file-correct');
                changeAlertSuccess('#metadata-primary-key');
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
 * Enable sumbit button
 */
function enableSubmitButton() {
    $('input[type="submit"]').prop('disabled', false);
}

/**
 * Enable sumbit button
 */
function disableSubmitButton() {
    $('input[type="submit"]').prop('disabled', true);
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
 * Drag and drop effects - still minor issues
 * gets stuck sometimes
 */
let dropCounter = 0;
$('.drop').bind({
    dragenter: function(ev) {
        dropCounter++;
        $(this).addClass('blue');
        ev.preventDefault();
    },

    dragleave: function() {
        dropCounter--;
        if (dropCounter === 0) {
            $(this).removeClass('blue');
        }
    },
    drop: function() {
        $(this).find('span').addClass('dropped');
        dropCounter = 0;
        $(this).removeClass('blue');
    }
});

/**
 * Drag and drop movement input
 */
$('#movement').change(function() {
    $('#movement-drop-text').text(this.files[0].name);
    $('#movement + span').addClass('dropped');
});


/**
 * Drag and drop metadata input
 */
$('#metadata').change(function() {
    $('#metadata-drop-text').text(this.files[0].name);
    $('#metadata + span').addClass('dropped');
});

/**
 * Change alert to Warning
 */
function changeAlertWarning(sel) {
    $(sel)
        .removeClass(function(index, css) {
            return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
        })
        .addClass('alert-warning');
}

/**
 * Change alert to danger
 */
function changeAlertDanger(sel) {
    $(sel)
        .removeClass(function(index, css) {
            return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
        })
        .addClass('alert-danger');
}

/**
 * Change alert to success
 */
function changeAlertSuccess(sel) {
    $(sel)
        .removeClass(function(index, css) {
            return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
        })
        .addClass('alert-success');
}

/**
 * Show the uploading icon after clicking on submit
 */
$('#submit').click(function() {
    $(this).hide();
    $('#submit-button').removeClass('hidden');
});


// upload from upload-wizard using tab
$(document).ready(function() {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //upload-wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

        let $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $('.next-step').click(function() {

        let $active = $('.upload-wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $('.prev-step').click(function() {

        let $active = $('.upload-wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
