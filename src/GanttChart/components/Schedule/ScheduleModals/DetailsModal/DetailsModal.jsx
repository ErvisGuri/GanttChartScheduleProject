import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

import "./detailsModal.scss";
import { dummyData } from "../../../../dummy-data";

const DetailsModal = ({
  setDetailsData,
  detailData,
  setVisible,
  visible,
  selectedTask,
  modalState,
}) => {
  const [itemData, setItemData] = useState(null);

  const handleClose = () => {
    setVisible(false);
  };

  // const neededData = () => {
  //   let dataa = [];
  //   Object?.keys(selectedTask?.toBeScheduled)?.forEach(function (key, index) {
  //     return dataa?.push?.(selectedTask?.toBeScheduled[key]);
  //   });
  //   let Concatdata = [].concat(dataa);
  //   let mergedData = [];
  //   let ds = Concatdata?.map?.((rl) => {
  //     rl?.map?.((dt) => mergedData.push(dt));
  //   });
  //   setItemData(mergedData);
  // };

  // const dataLabel = () => {
  //   let data1 = [];
  //   Object?.keys(selectedTask?.toBeScheduled)?.forEach(function (key, i) {
  //     return data1?.push?.(selectedTask.toBeScheduled[key]);
  //   });
  //   return data1;
  // };

  // console.log(dataLabel());

  // const findData = () => {
  //   let obj = [];
  //   itemData?.map((el) => {
  //     el?.serviceOptions?.map?.((sc) => {
  //       sc?.map?.((rd) => {
  //         rd?.items?.map?.((item) => {
  //           obj?.push?.({
  //             days: item?.days[0],
  //             id: item?.id,
  //             label: el?.label,
  //             elevationLabel: rd?.elevationLabel,
  //             totalProgress: item?.totalProgress,
  //             dayId: item?.day,
  //           });
  //         });
  //       });
  //     });
  //   });
  //   return obj;
  // };

  // useEffect(() => {
  //   if (!!selectedTask) {
  //     // message.info("test32", 5);
  //     neededData();
  //   }
  // }, [selectedTask]);

  // useEffect(() => {
  //   if (!!visible && !!selectedTask) {
  //     // message.info("test", 5);
  //     const detail = findData();
  //     setDetailsData(
  //       detail
  //         ?.filter((x) => !!x?.days)
  //         ?.filter((e) => e?.days === modalState?.id)
  //     );
  //   }
  // }, [visible, selectedTask]);

  return (
    <Modal
      centered
      onCancel={handleClose}
      className="details-modal"
      visible={visible}
      destroyOnClose={false}
      title="Day Details"
      footer={[
        <Button className="detailsCloseBtn" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
      ]}
      width={1350}
    >
      <div className="detailsContainer">
        {detailData?.map?.((el, i) => {
          console.log("el", el);
          return (
            <div className="detailsBody" key={i}>
              <div className="detailsContent">
                <div className="detailsLabel">
                  Label:
                  {el.label}
                </div>
                <div className="detailsElevationLabel">
                  ElevationLabel:
                  {el.elevationLabel}
                </div>
                <div className="detailsId">
                  ItemId:
                  {el.id}
                </div>
                <div className="detailsTotProgress">
                  TotalProgress:
                  {el.totalProgress}
                </div>
                <div className="detailsTotProgress">
                  DayId:
                  {el.days}
                </div>
              </div>
            </div>
          );
        })}
        <div className="detailsBody">
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
