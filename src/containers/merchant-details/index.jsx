import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

// actions
import { createMember, deleteMember, updateMember } from "../../actions/member";
import { getMembers, setMembersFilterParams } from "../../actions/members";
import { getMerchantById, updateMerchant } from "../../actions/merchant";
// styles
import "./merchant-details.css";
// components
import DeleteMemberModal from "../../components/delete-member-modal";
import MerchantsFormModal from "../../components/merchants-form-modal";
import MembersFormModal from "../../components/members-form-modal";
import MembersTable from "../../components/members-table";
import PhotoUpload from "../../components/photo-upload";

function MerchantDetails({
  createMember,
  deleteMember,
  filterParams,
  getMembers,
  getMerchantById,
  isLoading,
  isLoadingMembers,
  match,
  membersData,
  merchantDetails,
  setMembersFilterParams,
  totalCount,
  updateMerchant,
  updateMember,
}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isMerchantFormModalOpen, setMerchantFormModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const merchantId = match ? match.params.id : null;

  useEffect(() => {
    getMerchantById(merchantId);
  }, [getMerchantById, merchantId]);

  useEffect(() => {
    getMembers({ merchantId, ...filterParams });
  }, [filterParams, getMembers, merchantId]);

  const handleAddNewMerchantsClick = () => {
    setFormModalOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setMembersFilterParams({
      ...filterParams,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setMembersFilterParams({
      page: 0,
      pageSize: event.target.value,
    });
  };

  const handleConfirmDeleteMemberClick = () => {
    if (selectedMember) {
      deleteMember(selectedMember.id, () => {
        getMembers({ merchantId, ...filterParams });

        setMembersFilterParams({
          ...filterParams,
          page: 0,
        });
      });
      resetDeleteModal();
    }
  };

  const handleCreateNewMemberClick = (member) => {
    // add merchantId
    member.merchantId = merchantId;

    createMember(member, () => {
      getMembers({ merchantId, ...filterParams });
      resetFormModal();
    });
  };

  const handleDeleteMemberClick = (member) => {
    setDeleteModalOpen(true);
    setSelectedMember(member);
  };

  const handleUpdateMemberClick = (member) => {
    if (selectedMember) {
      updateMember(selectedMember.id, member, () => {
        getMembers({ merchantId, ...filterParams });
        resetFormModal();
      });
    }
  };

  const handleUpdateMerchantClick = (merchant) => {
    if (merchantDetails) {
      updateMerchant(merchantDetails.id, merchant, () => {
        getMerchantById(merchantId);
        setMerchantFormModalOpen(false);
      });
    }
  };

  const handleViewMemberClick = (member) => {
    setFormModalOpen(true);
    setSelectedMember(member);
  };

  const resetDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedMember(null);
  };

  const resetFormModal = () => {
    setFormModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="merchant-container">
      <>
        <div className="merchant-header">
          <div className="merchant-title">Merchant Details</div>
        </div>

        {!isLoading && merchantDetails && (
          <div className="merchant-details">
            <div className="merchant-details-box">
              <PhotoUpload
                merchantId={merchantId}
                src={
                  merchantDetails && merchantDetails.logoBase64
                    ? `data:image/jpeg;base64,${merchantDetails.logoBase64}`
                    : null
                }
              />
            </div>
            <div className="merchant-details-box">
              <div>
                <b>ID:</b> {merchantDetails ? merchantDetails.id : "-"}
              </div>
              <div>
                <b>Name:</b> {merchantDetails ? merchantDetails.name : "-"}
                {merchantDetails && (
                  <IconButton onClick={() => setMerchantFormModalOpen(true)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        )}
      </>

      {isLoading ? (
        <div className="generic-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          {merchantDetails ? (
            <>
              <div className="merchant-header">
                <div className="merchant-title">Team Members</div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNewMerchantsClick}
                >
                  Add new member
                </Button>
              </div>
              <div className="generic-container">
                {isLoadingMembers ? (
                  <CircularProgress />
                ) : (
                  <MembersTable
                    data={membersData}
                    filterParams={filterParams}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleDeleteMemberClick={handleDeleteMemberClick}
                    handleViewMemberClick={handleViewMemberClick}
                    totalCount={totalCount}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="generic-container">No data exist ...</div>
          )}
        </>
      )}

      {isDeleteModalOpen && selectedMember && (
        <DeleteMemberModal
          handleClose={resetDeleteModal}
          handleDeleteMember={handleConfirmDeleteMemberClick}
          isOpen={isDeleteModalOpen}
          member={selectedMember}
        />
      )}

      {isFormModalOpen && (
        <MembersFormModal
          handleClose={resetFormModal}
          handleCreateNewMember={handleCreateNewMemberClick}
          handleUpdateMember={handleUpdateMemberClick}
          isOpen={isFormModalOpen}
          member={selectedMember}
        />
      )}

      {isMerchantFormModalOpen && merchantDetails && (
        <MerchantsFormModal
          closeModal={() => setMerchantFormModalOpen(false)}
          handleUpdateMerchant={handleUpdateMerchantClick}
          isOpen={isMerchantFormModalOpen}
          merchant={merchantDetails}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filterParams: state.members.filterParams,
    membersData: state.members.data,
    merchantDetails: state.merchant.data,
    isLoading: state.merchant.isFetching,
    isLoadingMembers: state.members.isFetching,
    totalCount: state.members.totalCount,
  };
};

const mapDispatch = {
  createMember,
  deleteMember,
  getMembers,
  getMerchantById,
  setMembersFilterParams,
  updateMerchant,
  updateMember,
};

export default connect(mapStateToProps, mapDispatch)(MerchantDetails);
