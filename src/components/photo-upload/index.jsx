import React, { useState } from "react";
import { connect } from "react-redux";

// style
import "./photo-upload.css";

// actions
import { uploadMerchantPhoto } from "../../actions/merchant";
import { showSnackBar } from "../../actions/snackBar";

// utils
import { STATUS } from "../../utils/constants";

const SIZE_LIMIT = 1000 * 50; // 50 kb

function PhotoUpload({ merchantId, showSnackBar, uploadMerchantPhoto, src }) {
  const [photoUrl, setPhotoUrl] = useState(src);

  const hanldeUploadPhoto = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > SIZE_LIMIT) {
        showSnackBar({
          message: "File should not be more than 50kb.",
          status: STATUS.error,
        });
      } else {
        uploadMerchantPhoto(merchantId, file);
        setPhotoUrl(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="photo-container">
      <div className="photo-placeholder">
        {photoUrl && (
          <img src={photoUrl} alt="company logo" className="photo-display" />
        )}
      </div>

      <label className="photo-text-disclaimer">
        (Upload Photo)
        <input
          type="file"
          name="file"
          onChange={hanldeUploadPhoto}
          accept="image/x-png"
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}

const mapDispatch = {
  showSnackBar,
  uploadMerchantPhoto,
};

export default connect(null, mapDispatch)(PhotoUpload);
