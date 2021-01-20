import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";

// actions
import { createMerchant, updateMerchant } from "../../actions/merchant";
import { getMerchants, setMerchantFilterParams } from "../../actions/merchants";
// styles
import "./home.css";
//components
import MerchantsTable from "../../components/merchants-table";
import MerchantsFormModal from "../../components/merchants-form-modal";

function Home({
  createMerchant,
  data,
  filterParams,
  getMerchants,
  history,
  isLoading,
  setMerchantFilterParams,
  totalCount,
  updateMerchant,
}) {
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  useEffect(() => {
    getMerchants({ ...filterParams });
  }, [getMerchants, filterParams]);

  const handleAddNewMerchantsClick = () => {
    setFormModalOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setMerchantFilterParams({
      ...filterParams,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setMerchantFilterParams({
      page: 0,
      pageSize: event.target.value,
    });
  };

  const handleCreateNewMerchantClick = (merchant) => {
    createMerchant(merchant, (data) => {
      handleViewMerchantDetails(data.id);
    });
  };

  const handleViewMerchantDetails = (id) => {
    history.push(`/merchant/${id}`);
  };

  const handleViewMerchantFormDetails = (merchant) => {
    setFormModalOpen(true);
    setSelectedMerchant(merchant);
  };

  const handleUpdateMerchantClick = (merchant) => {
    if (selectedMerchant) {
      updateMerchant(selectedMerchant.id, merchant, () => {
        getMerchants({ ...filterParams });
        resetFormModal();
      });
    }
  };

  const resetFormModal = () => {
    setFormModalOpen(false);
    setSelectedMerchant(null);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-title">Merchants</div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewMerchantsClick}
        >
          Add new merchant
        </Button>
      </div>

      <div className="generic-container">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {data && (
              <MerchantsTable
                data={data}
                filterParams={filterParams}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleViewMerchantDetails={handleViewMerchantDetails}
                handleViewMerchantFormDetails={handleViewMerchantFormDetails}
                totalCount={totalCount}
              />
            )}
          </>
        )}
      </div>

      {isFormModalOpen && (
        <MerchantsFormModal
          handleClose={resetFormModal}
          handleCreateNewMerchant={handleCreateNewMerchantClick}
          handleUpdateMerchant={handleUpdateMerchantClick}
          isOpen={isFormModalOpen}
          merchant={selectedMerchant}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.merchants.data,
    isLoading: state.merchants.isFetching,
    filterParams: state.merchants.filterParams,
    totalCount: state.merchants.totalCount,
  };
};

const mapDispatch = {
  createMerchant,
  getMerchants,
  setMerchantFilterParams,
  updateMerchant,
};

export default connect(mapStateToProps, mapDispatch)(Home);
