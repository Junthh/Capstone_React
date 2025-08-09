import React, { useState, useEffect } from "react";

export default function MovieSchedule({ schedule, formatDateTime }) {
  const [selectedHeThong, setSelectedHeThong] = useState(
    schedule.length > 0 ? schedule[0].maHeThongRap : null
  );

  const heThongSelected = schedule.find(
    (ht) => ht.maHeThongRap === selectedHeThong
  );

  const [selectedCumRap, setSelectedCumRap] = useState(
    heThongSelected && heThongSelected.cumRapChieu.length > 0
      ? heThongSelected.cumRapChieu[0].maCumRap
      : null
  );

  useEffect(() => {
    if (heThongSelected && heThongSelected.cumRapChieu.length > 0) {
      setSelectedCumRap(heThongSelected.cumRapChieu[0].maCumRap);
    } else {
      setSelectedCumRap(null);
    }
  }, [selectedHeThong]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6 w-24 sticky top-20 overflow-y-auto max-h-[800px] border-r border-gray-300 pr-4">
        {schedule.map((heThong) => (
          <button
            key={heThong.maHeThongRap}
            onClick={() => setSelectedHeThong(heThong.maHeThongRap)}
            className={`p-2 rounded-lg border transition ${
              heThong.maHeThongRap === selectedHeThong
                ? "border-red-600 bg-red-100"
                : "border-gray-300 hover:border-red-500"
            }`}
            title={heThong.tenHeThongRap}
          >
            <img
              src={heThong.logo}
              alt={heThong.tenHeThongRap}
              className="w-16 h-16 object-contain"
            />
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          {heThongSelected && heThongSelected.cumRapChieu.length > 0 ? (
            heThongSelected.cumRapChieu.map((cumRap) => (
              <button
                key={cumRap.maCumRap}
                onClick={() => setSelectedCumRap(cumRap.maCumRap)}
                className={`px-4 py-2 rounded-lg border cursor-pointer transition ${
                  selectedCumRap === cumRap.maCumRap
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-red-100"
                }`}
                title={cumRap.diaChi}
              >
                {cumRap.tenCumRap}
              </button>
            ))
          ) : (
            <p className="text-gray-600">Chưa có cụm rạp để hiển thị.</p>
          )}
        </div>
        <div className="overflow-y-auto max-h-[500px]">
          {selectedCumRap && heThongSelected ? (
            heThongSelected.cumRapChieu
              .filter((cumRap) => cumRap.maCumRap === selectedCumRap)
              .map((cumRap) => (
                <div key={cumRap.maCumRap}>
                  <h5 className="text-lg font-semibold mb-1">{cumRap.tenCumRap}</h5>
                  <p className="text-sm text-gray-500 mb-4">{cumRap.diaChi}</p>

                  <div className="flex flex-wrap gap-3">
                    {cumRap.lichChieuPhim.map((lich) => (
                      <button
                        key={lich.maLichChieu}
                        className="px-4 py-2 border rounded-lg text-sm hover:bg-red-600 hover:text-white transition"
                        onClick={() =>
                          alert(`Bạn chọn suất chiếu mã ${lich.maLichChieu}`)
                        }
                        title={`Rạp: ${lich.tenRap}\nThời gian: ${formatDateTime(
                          lich.ngayChieuGioChieu
                        )}\nGiá vé: ${lich.giaVe.toLocaleString()} VND\nThời lượng: ${
                          lich.thoiLuong
                        } phút`}
                      >
                        {formatDateTime(lich.ngayChieuGioChieu)}
                      </button>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-600">Chưa có suất chiếu để hiển thị.</p>
          )}
        </div>
      </div>
    </div>
  );
}
