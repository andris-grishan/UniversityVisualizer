Dropzone.autoDiscover = false;

$.extend($.expr[':'], {
    'containsi': function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
        .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

$(document).ready(function() {
    var objectModal = $("#object-modal");
    var preloader = $(".preloader");

    var myDropzone = new Dropzone(
        ".images-upload-wrapper",
        {
            url: "/admin/uploadfile",
            addRemoveLinks: true,
            acceptedFiles: "image/*",
            dictRemoveFile: "Remove",
            dictDefaultMessage: "Put your custom message here",
            init: function() {
                this.element.classList.add('dropzone');
            },
            success: function (file, response) {
                if (response.status == "ok") {
                    file.previewElement.classList.add("dz-success");
                    $(file.previewElement).find(".dz-progress").remove();
                    $(file.previewElement).find(".dz-filename span").html(response.file);
                }
            },
        }
    );

    $("textarea").trumbowyg({
        btns: [
            ['historyUndo', 'historyRedo'],
            ['strong', 'em'],
            ['fontfamily', 'fontsize'],
            ['foreColor', 'backColor'],
            ['justifyLeft', 'justifyCenter'],
            ['insertImage', 'link'],
        ],
        autogrow: true
    });

    objectModal.on('hidden.bs.modal', function (e) {
        clearModalData(
            $(this),
            myDropzone
        );
    });

    $(".show-object-modal").off().on("click", function() {
        objectModal.find("input[name='action']").val("create");
        objectModal.modal("show");
    });

    objectModal.find(".save-record").off().on("click", function() {
        var form = objectModal.find(".object-form")[0];
        var formData = new FormData(form);

        formData = appendImagesToFormData(formData);

        if (formData.get("id").trim() == "") {
            alert("Field \"Id\" cannot be empty!");
        }

        $.ajax({
            type: "POST",
            url: "/admin/save",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function() {
                preloader.show();
            },
            success: function(data) {
                preloader.hide();

                if (data.status == "ok") {
                    window.location.reload(true);
                } else {
                    showError(data["errors"]);
                }
            }
        });
    });

    $(".edit-record").off().on("click", function() {
        var parentRow = $(this).parents().eq(1);

        var recordId = parentRow.data('id');
        var recordType = parentRow.data('type');

        $.ajax({
            type: "GET",
            url: "/api/get/" + recordType + "/" + recordId,
            beforeSend: function() {
                preloader.show();
            },
            success: function(data) {
                preloader.hide();

                if (data.status == "ok") {
                    objectModal.find("input[name='action']").val("edit");

                    fillDataInModal(
                        data["response"],
                        objectModal,
                        myDropzone
                    );

                    objectModal.modal("show");
                } else {
                    showError(data["errors"]);
                }
            }
        });
    });

    $(".delete-record").off().on("click", function() {
        var parentRow = $(this).parents().eq(1);

        var recordId = parentRow.data('id');
        var recordType = parentRow.data('type');

        var cnfr = confirm("Are you sure?");

        if (cnfr) {
            $.ajax({
                type: "POST",
                url: "/admin/delete",
                data: {
                    id: recordId,
                    type: recordType
                },
                beforeSend: function() {
                    preloader.show();
                },
                success: function(data) {
                    preloader.hide();

                    if (data.status == "ok") {
                        window.location.reload(true);
                    } else {
                        showError(data.errors);
                    }
                }
            });
        }
    });

    $(".table-search-wrapper input").off().on("keyup", function() {
        var searchBlock = $(this).parents().eq(2);

        searchByTable(
            searchBlock,
            "#room-table"
        );
    });
});

function showError(errorList) {
    var msg = errorList.join('\n,');
    alert(msg);
}

function fillDataInModal(object, modal, myDropzone) {
    $.each(object, function(fieldKey, fieldVal) {
        var field = modal.find("*[name='" + fieldKey + "']");

        if (field.is("textarea")) {
            field.trumbowyg(
                'html',
                fieldVal
            );
        } else {
            field.val(fieldVal);
        }
    });

    $.each(object["images"], function(key, filePath) {
        var mockFile = {
            name: filePath.replace(/^.*[\\\/]/, ''),
            size: 0
        };

        myDropzone.emit("addedfile", mockFile);
        myDropzone.emit("thumbnail", mockFile, filePath);
        myDropzone.emit("complete", mockFile);
    });
}

function clearModalData(modal, myDropzone) {
    $(myDropzone.element).find(".dz-preview").remove();
    $(myDropzone.element).removeClass("dz-started");

    $.each(modal.find("input, textarea"), function(fieldKey, field) {
        if ($(field).is("textarea")) {
            $(field).trumbowyg(
                'html',
                ''
            );
        } else {
            field.value = null;
        }
    });
}

function appendImagesToFormData(formData) {
    var imagesArr = [];
    $.each($(".images-upload-wrapper .dz-complete .dz-filename span"), function() {
        imagesArr.push(this.innerHTML);
    });

    formData.set("images", JSON.stringify(imagesArr));

    return formData;
}

function searchByTable(searchBlock, tableSelector) {
    var table = $(tableSelector);
    var tableRows = table.find("tbody tr");
    var selectorArr = {};

    tableRows.removeClass("hidden");

    $.each(searchBlock.find("input"), function() {
        if (this.value.trim() != '') {
            var searchText = this.value;
            var searchField = $(this).parents().eq(0).data("field");

            selectorArr[searchField] = searchText;
        }
    });

    var selectorCount = Object.keys(selectorArr).length;
    $.each(tableRows, function() {
        var tr = $(this);
        var total = 0;

        $.each(selectorArr, function(selectorKey, selectorValue) {
            if (tr.find("td[data-field='" + selectorKey + "']:containsi(" + selectorValue + ")").length > 0) {
                total++;
            }
        });

        if (total != selectorCount) {
            tr.addClass("hidden");
        }
    });
}