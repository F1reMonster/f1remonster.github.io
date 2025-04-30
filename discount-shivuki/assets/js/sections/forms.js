const html = document.querySelector("html");
const documentLanguage = html.attributes.lang.value;
let lang = documentLanguage;
let select2PlaceholderInterests = "";
let dropzoneCustomTooBig = "";

if (documentLanguage === "he") {
	lang = "he";
	select2PlaceholderInterests = "תחומי עניין";
	dropzoneCustomTooBig = "גודל קובץ מקסימלי: {{maxFilesize}}MiB.";
} else {
	lang = "en";
	select2PlaceholderInterests = "Interests";
	dropzoneCustomTooBig = "Max filesize: {{maxFilesize}}MiB.";
}

// year multiselect
(function () {
	$(".js-select2-interests")
		.select2({
			language: lang,
			closeOnSelect: false,
			placeholder: select2PlaceholderInterests,
			allowHtml: true,
			allowClear: true,
		})
		.on("change", function (e) {
			let select2Id = $(this).next().attr("data-select2-id");
			let counter = $("[data-select2-id=" + select2Id + "] .select2-selection__choice").length;

			if (counter > 3) {
				$("[data-select2-id=" + select2Id + "] .select2-selection__rendered li:not(.select2-search--inline)").hide();
				if ($("[data-select2-id=" + select2Id + "] .select2-rendered")) {
					$("[data-select2-id=" + select2Id + "] .select2-rendered").remove();
					$("[data-select2-id=" + select2Id + "] .select2-selection__rendered").after(
						'<span class="select2-rendered"><span class="select2-items">' +
							$("[data-select2-id=" + select2Id + "] .select2-selection__choice")
								.eq(0)
								.html() +
							", " +
							$("[data-select2-id=" + select2Id + "] .select2-selection__choice")
								.eq(1)
								.html() +
							", " +
							$("[data-select2-id=" + select2Id + "] .select2-selection__choice")
								.eq(2)
								.html() +
							'</span><span class="select2-counter">&nbsp;(' +
							counter +
							")</span></span> "
					);
				}
			} else {
				$("[data-select2-id=" + select2Id + "] .select2-rendered").remove();
				$("[data-select2-id=" + select2Id + "] .select2-selection__rendered li:not(.select2-search--inline)").show();
			}
		});

	$(".js-select2-interests").on("select2:open", function (e) {
		var $searchfield = $(this).parent().find(".select2-search__field");
		$searchfield.prop("disabled", true);
	});
})();

const dzTemplate = '<div class="dz-preview dz-file-preview"><div class="file-item"><div class="file-item-body"><div class="file-icon"><img src="assets/img/file-icons/file-icon.svg" alt="icon" /></div><div class="file-info progress-show"><div class="file-info-wrapper"><div class="file-name"><div class="dz-filename"><span data-dz-name></span></div></div><div class="file-size"><div class="dz-size"><span data-dz-size></span></div></div><div class="file-progress"><div class="file-progress-indicator"></div></div></div><div class="file-info-action"><div class="file-info-msg"></div><div data-dz-remove class="file-info-btn close dz-delete"></div></div></div></div></div></div>';

// file upload via dropzone

// Dropzone.prototype.defaultOptions.dictDefaultMessage = "Drop files here to upload";
// Dropzone.prototype.defaultOptions.dictFallbackMessage = "Your browser does not support drag'n'drop file uploads.";
// Dropzone.prototype.defaultOptions.dictFallbackText = "Please use the fallback form below to upload your files like in the olden days.";
// Dropzone.prototype.defaultOptions.dictFileTooBig = "Max filesize: {{maxFilesize}}MiB.";
// Dropzone.prototype.defaultOptions.dictInvalidFileType = "You can't upload files of this type.";
// Dropzone.prototype.defaultOptions.dictResponseError = "Server responded with {{statusCode}} code.";
// Dropzone.prototype.defaultOptions.dictCancelUpload = "Cancel upload";
// Dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = "Are you sure you want to cancel this upload?";
// Dropzone.prototype.defaultOptions.dictRemoveFile = "Remove file";
// Dropzone.prototype.defaultOptions.dictMaxFilesExceeded = "You can not upload any more files.";

$("#uploadFileBtn1, #uploadFileBtn1>*").dropzone({
	url: "upload.php",
	autoDiscover: false,
	// autoProcessQueue: false,
	previewsContainer: ".files-container",
	acceptedFiles: "",
	maxFilesize: 2,
	dictFileTooBig: dropzoneCustomTooBig,
	previewTemplate: dzTemplate,
	error: function (file, message, xhr) {
		$(file.previewElement).addClass("dz-error").find(".file-info").removeClass("progress-show").addClass("error");
		$(file.previewElement).find(".file-progress").remove();
		$(file.previewElement).find(".file-info-wrapper").append('<div class="file-error"></div>');
		$(file.previewElement).find(".file-error").text(message);

		// console.log(Dropzone.QUEUED);
		// console.log(file.status);

		var retryTimes = 3;
		var th = this;
		if (file.status === "error") {
			$(".file-info-msg").on("click", function () {
				if (!file.retryTimes) {
					file.retryTimes = 0;
				}

				file.retryTimes = file.retryTimes + 1;

				if (file.retryTimes < retryTimes) {
					file.status = Dropzone.QUEUED;
					// dropzone.processQueue(); // No need this as I already have autoProcessQueue = true
				} else {
					th.removeFile(file);
				}
			});
		}
	},
	uploadprogress: function (file, progress, bytesSent) {
		if (file.previewElement) {
			var progressElement = file.previewElement.querySelector(".file-progress-indicator");
			var progressText = file.previewElement.querySelector(".file-info-msg");
			progressElement.style.width = Math.round(progress) + "%";
			progressText.textContent = Math.round(progress) + "%";
		}

		if (progress === 100) {
			file.previewElement.querySelector(".file-info").classList.remove("progress-show");
			file.previewElement.querySelector(".file-progress").remove();
			file.previewElement.querySelector(".file-info-btn").classList.remove("close");
			file.previewElement.querySelector(".file-info-btn").classList.add("delete");
			file.previewElement.querySelector(".file-info-msg").textContent = "";
		}
	},
});

$(".textarea").on("keyup", function () {
	let $len = $(this).val().length;
	var $text = $(this).val();

	if ($len >= 501) {
		$(this).val($text.substring(0, 500));
	} else {
		if ($len > 490) {
			$(this).next().find("span").css("color", "red");
		} else {
			$(this).next().find("span").css("color", "black");
		}

		$(this)
			.next()
			.find("span")
			.text(500 - $len);
	}
});

if ($(".sign-field").length > 0) {
	$(".sign-field").hide();

	$("#sign").on("click", function (e) {
		e.preventDefault();
		$("#signature").empty();
		$(this).attr("disabled", true);
		$(".sign-field").show();
		$(".sign-container").jqSignature();
	});

	$("#save-sign").on("click", function (e) {
		e.preventDefault();
		$("#signature").empty();
		$(".sign-field").hide();
		$('#sign').attr("disabled", false);
		var dataUrl = $(".sign-container").eq(0).jqSignature("getDataURL");
		var img = $("<img>").attr("src", dataUrl);
		$("#signature").append(img);
	});

	$("#clear-sign").on("click", function (e) {
		e.preventDefault();
		$(".sign-container").eq(0).jqSignature("clearCanvas");
	});

	$(".sign-container").eq(0).on("jq.signature.changed", function () {
		$("#save-sign").attr("disabled", false);
	});

}



