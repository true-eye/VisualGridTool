let myJson;
let sections = [];
let selectedSection;
let selectedSectionIndex = -1;
let rows = [];
let selectedRow;
let selectedRowIndex = -1;
let columns = [];
let selectedColumn;
let selectedColumnIndex = -1;

document.getElementById('btnPreview').addEventListener('click', function() {
    document.getElementById('previewRoot').innerHTML = json2bootgrid(myJson);
});

let onSelectSection = (index) => {
    //console.log(`section ${index} selected`);
    if( selectedSectionIndex == index )
        return ;
    selectedSection = sections[index];
    selectedSectionIndex = index;

    // get rows from selected section
    rows = selectedSection.rows;

    // initialize selected Row index
    selectedRowIndex = -1;
    selectedColumnIndex = -1;

    //invalidate the page
    viewInvalidate();
}

let addSections = () => {
    let S = '';
    for (let i in sections) {
        if( i == selectedSectionIndex )
            S += `<button type="button" class="btn btn-dark btn-block" onClick="onSelectSection(${i})">${sections[i].name}</button>`;
        else
            S += `<button type="button" class="btn btn-outline-light btn-block" onClick="onSelectSection(${i})">${sections[i].name}</button>`;
    }
    document.getElementById('sections').innerHTML = S;
}

let onSelectRow = (index) => {
    //console.log(`row ${index} selected`);
    if( selectedRowIndex == index )
        return ;
    selectedRow = rows[index];
    selectedRowIndex = index;

    // get columns from selected row
    columns = selectedRow.columns;

    // initialize selected column index
    selectedColumnIndex = -1;

    //invalidate the page
    viewInvalidate();
}

let addRows = () => {
    let S = '';
    for (let i in rows) {
        if( i == selectedRowIndex )
            S += `<button type="button" class="btn btn-dark btn-block" onClick="onSelectRow(${i})">${rows[i].name}</button>`;
        else
            S += `<button type="button" class="btn btn-outline-light btn-block" onClick="onSelectRow(${i})">${rows[i].name}</button>`;
    }
    document.getElementById('rows').innerHTML = S;
}

let onSelectColumn = (index) => {
    console.log(`column ${index} selected`);
    if( selectedColumnIndex == index )
        return ;
    selectedColumn = columns[index];
    selectedColumnIndex = index;

    //invalidate the page
    viewInvalidate();
}

let addColumns = () => {
    let S = '';
    for (let i in columns) {
        if( i == selectedColumnIndex )
            S += `<button type="button" class="btn btn-dark btn-block" onClick="onSelectColumn(${i})">${columns[i].name}</button>`;
        else
            S += `<button type="button" class="btn btn-outline-light btn-block" onClick="onSelectColumn(${i})">${columns[i].name}</button>`;
    }
    document.getElementById('columns').innerHTML = S;
}

let hidePanel = (panelId) => {
    document.getElementById(panelId).setAttribute('style', 'visibility: hidden');
}

let showPanel = (panelId) => {
    document.getElementById(panelId).setAttribute('style', 'visibility: visible');
}

let hideAllPanels = () => {
    hidePanel('panel-section-detail');
    hidePanel('panel-rows');
    hidePanel('panel-row-detail');
    hidePanel('panel-columns');
    hidePanel('panel-column-detail');
}

let setTextValue = (id, value) => {
    document.getElementById(id).value = value;
}

let getTextValue = (id) => {
    return document.getElementById(id).value;
}

let onShowRows = () => {
    showPanel('panel-rows');
}

let onShowColumns = () => {
    showPanel('panel-columns');
}

let showSectionDetail = () => {
    let S = '';

    if (selectedSectionIndex == -1)
        return ;

    showPanel('panel-section-detail');

    if (selectedRowIndex != -1)
        showPanel('panel-rows');

    setTextValue('section-name', selectedSection.name);
    setTextValue('section-title', selectedSection.title);
    setTextValue('section-background', selectedSection.background);
}

let showRowDetail = () => {
    let S = '';

    if (selectedRowIndex == -1)
        return ;

    showPanel('panel-row-detail');

    if (selectedColumnIndex != -1)
        showPanel('panel-columns');

    setTextValue('row-name', selectedRow.name);
    setTextValue('row-background', selectedRow.background);
}

let showColumnDetail = () => {
    let S = '';

    if (selectedColumnIndex == -1)
        return ;

    showPanel('panel-column-detail');

    setTextValue('column-name', selectedColumn.name);
    setTextValue('column-background', selectedColumn.background);
}

let sectionDetailChange = (prop) => {
    console.log(`section ${prop} changed`);
    //console.log(getTextValue(`section-${prop}`));
    selectedSection[prop] = getTextValue(`section-${prop}`);

    updateData();
}

let rowDetailChange = (prop) => {
    //console.log(`row ${prop} changed`);
    //console.log(getTextValue(`row-${prop}`));
    selectedRow[prop] = getTextValue(`row-${prop}`);

    updateData();
}

let columnDetailChange = (prop) => {
    //console.log(`column ${prop} changed`);
    //console.log(getTextValue(`column-${prop}`));
    selectedColumn[prop] = getTextValue(`column-${prop}`);

    updateData();
}

let onDeleteSection = () => {
    if( selectedSectionIndex == -1 )
    {
        window.alert('Select Section');
        return;
    }

    delete sections[selectedSectionIndex];

    myJson.sections = sections;

    selectedSectionIndex = -1;
    selectedColumnIndex = -1;
    selectedRowIndex = -1;
    viewInvalidate();
}

let onDeleteRow = () => {
    if( selectedRowIndex == -1 )
    {
        window.alert('Select Row');
        return;
    }

    delete selectedSection.rows[selectedRowIndex];

    sections[selectedSectionIndex] = selectedSection;
    myJson.sections = sections;

    selectedColumnIndex = -1;
    selectedRowIndex = -1;
    viewInvalidate();
    showPanel('panel-rows');
}

let onDeleteColumn = () => {
    //console.log(`delete column ${selectedColumnIndex}`);
    if( selectedColumnIndex == -1 )
    {
        window.alert('Select column');
        return;
    }
    
    delete selectedRow.columns[selectedColumnIndex];

    rows[selectedRowIndex] = selectedRow;
    selectedSection.rows[selectedRowIndex] = selectedRow;
    sections[selectedSectionIndex] = selectedSection;
    myJson.sections = sections;

    selectedColumnIndex = -1;
    viewInvalidate();
    showPanel('panel-columns');
}

let updateData = () => {
    if( selectedColumnIndex != -1 )
    {
        columns[selectedColumnIndex] = selectedColumn;
        selectedRow.columns[selectedColumnIndex] = selectedColumn;
    }

    if( selectedRowIndex != -1 )
    {
        rows[selectedRowIndex] = selectedRow;
        selectedSection.rows[selectedRowIndex] = selectedRow;
    }

    if( selectedSectionIndex != -1 )
    {
        sections[selectedSectionIndex] = selectedSection;
    }
    
    myJson.sections = sections;
    if(bUpdateView == true)
        viewInvalidate();
}

let viewInvalidate = () => {
    addSections();

    hideAllPanels();

    showSectionDetail();
    addRows();
    showRowDetail();
    addColumns();
    showColumnDetail();
}


var saveJsonFile = function (url, filename, json) {
    var file = {
        json: JSON.stringify(json)
    };
    return $.ajax({
        beforeSend: function (jqxhr, settings) {
            jqxhr.filename = filename;
        },
        url: url,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: file
    }).then(function (data, textStatus, jqxhr) {
            $("a#download").attr({
                "download": jqxhr.filename + ".json",
                    "href": "data:application/json;charset=utf8;base64," 
                            + window.btoa(JSON.stringify(data))
            }).get(0).click();
     }, function(jqxhr, textStatus, errorThrown) {
          console.log(textStatus, errorThrown)
    });
};

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

let onSaveJson = () => {
    //saveJsonFile("json/", "output", myJson);
    download(myJson, 'output.json', 'text/plain');
}

this.onload = function(){
    readTextFile("../json/sample4.json", function(text){
        myJson = JSON.parse(text);
        sections = myJson.sections;

        console.log('json file loaded');

        viewInvalidate();
    });
}