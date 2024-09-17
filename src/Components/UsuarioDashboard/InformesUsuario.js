"use client";
import React from "react";

const InformesUsuario = () => {
  return (
    <div className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full ">
        <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
          <div
            key={1}
            className="w-full h-80 bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end"></div>
              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  Informe
                </p>
                <p className="text-[#00153B] text-[40px] leading-[63px] font-bold">
                  Estado Contable
                </p>
              </div>
            </div>
            <div className="pt-[25px] px-[25px] pb-[35px]">
              <div className="mt-[25px] content-center">
                <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Descargar informe
                </button>
              </div>
            </div>
          </div>
          <div
            key={2}
            className="w-full h-80 bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="h-[60%] pt-[15px] px-[25px] pb-[25px]">
              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  Informe
                </p>
                <p className="text-[#00153B] text-[40px] leading-[63px] font-bold">
                  Balance Anual
                </p>
              </div>
            </div>
            <div className="pt-[25px] px-[25px] pb-[35px]">
              <div className="mt-[25px]">
                <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Descargar informe
                </button>
              </div>
            </div>
          </div>
          <div
            key={3}
            className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="h-[60%] pt-[15px] px-[25px] pb-[25px]">
              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  Informe
                </p>
                <p className="text-[#00153B] text-[36px] leading-[63px] font-bold">
                  Reajuste anual cuota mensual
                </p>
              </div>
            </div>
            <div className="pt-[25px] px-[25px] pb-[35px]">
              <div className="mt-[25px]">
                <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Descargar informe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformesUsuario;
