<div class="table-search-wrapper row">
    <div class="col-xs-12 col-md-4 search-input-wrapper" data-field="id">
        <input type="search" class="form-control" placeholder="Id" value="" name="search_by_id" autocomplete="off" />
    </div>
    <div class="col-xs-12 col-md-4 search-input-wrapper" data-field="title">
        <input type="search" class="form-control" placeholder="Title" value="" name="search_by_title" autocomplete="off" />
    </div>
    <div class="col-xs-12 col-md-4 search-input-wrapper" data-field="changedate">
        <input type="search" class="form-control" placeholder="Last changes" value="" name="search_by_date" autocomplete="off" />
    </div>
</div>

<div class="table-buttons">
	<button class="btn btn-primary show-object-modal" type="button">Create new</button>
</div>

<!-- Table  -->
<div class="table-responsive table-wrapper">
    <table class="table" id="room-table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Last changes</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <?php
                foreach ($_viewData["roomList"] as $row) {
                    echo sprintf(
                        "<tr data-id=\"%s\" data-type=\"%s\">
                            <td data-field=\"id\">%s</td>
                            <td data-field=\"title\">%s</td>
                            <td data-field=\"changedate\">%s</td>
                            <td>
                                <button type=\"button\" class=\"btn btn-info edit-record\">
                                    <svg fill=\"#007bff\" focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"></path></svg>
                                </button>
                                <button type=\"button\" class=\"btn btn-danger delete-record\">
                                    <svg fill=\"#f66257\" focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z\"></path></svg>
                                </button>
                            </td>
                        </tr>",
                        $row["id"],
                        "room",
                        $row["id"],
                        $row["title"],
                        $row["changedate"]
                    );
                }
            ?>
        </tbody>
    </table>

</div>
<!-- /Table  -->

<!-- modals  -->
<div class="modal fade" id="object-modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title">Room</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="object-form" enctype="multipart/form-data">
                    <input type="hidden" name="action" />
                    <div class="row field-wrapper">
                        <div class="col-md-12 field-title">
                            Id:
                        </div>
                        <div class="col-md-12 field-input">
                            <input class="form-control" type="text" name="id" required />
                        </div>
                    </div>
                    <div class="row field-wrapper">
                        <div class="col-md-12 field-title">
                            Title:
                        </div>
                        <div class="col-md-12 field-input">
                            <input class="form-control" type="text" name="title" required />
                        </div>
                    </div>
                    <div class="row field-wrapper">
                        <div class="col-md-12 field-title">
                            Content:
                        </div>
                        <div class="col-md-12 field-input">
                            <textarea class="form-control" name="content"></textarea>
                        </div>
                    </div>
                    <div class="row field-wrapper">
                        <div class="col-md-12 field-title">
                            Images:
                        </div>
                        <div class="col-md-12 field-input">
                            <div class="images-upload-wrapper">
                                <div class="dz-default dz-message"><button class="dz-button" type="button">Drop files here to upload</button></div>
                            </div>
                            <!-- <div action="/admin/uploadfile" class="dropzone images-upload-wrapper"></div> -->
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success save-record">Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /modals -->