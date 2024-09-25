"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  tableCol: {
    width: "25%",
    padding: 5,
  },
});

// Definir el documento PDF
const MyDocument = ({ estadoContable }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Detalles del Estado Contable</Text>
        <Text style={styles.text}>
          Fecha: {new Date(estadoContable.fecha).toLocaleDateString()}
        </Text>
      </View>

      {/* Ingresos en Pesos */}
      <View style={styles.section}>
        <Text style={styles.text}>Ingresos en Pesos:</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Denom.</Text>
            <Text style={styles.tableCol}>Ingreso</Text>
            <Text style={styles.tableCol}>Moneda</Text>
            <Text style={styles.tableCol}>SubRubro</Text>
          </View>
          {estadoContable.listaIngresos
            .filter((ingreso) => ingreso.tipoMoneda === "UR")
            .map((ingreso) => (
              <View key={ingreso.id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{ingreso.denominacion}</Text>
                <Text style={styles.tableCol}>{ingreso.ingreso}</Text>
                <Text style={styles.tableCol}>{ingreso.tipoMoneda}</Text>
                <Text style={styles.tableCol}>{ingreso.subRubro}</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Ingresos en Dólares */}
      <View style={styles.section}>
        <Text style={styles.text}>Ingresos en Dólares:</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Denom.</Text>
            <Text style={styles.tableCol}>Ingreso</Text>
            <Text style={styles.tableCol}>Moneda</Text>
            <Text style={styles.tableCol}>SubRubro</Text>
          </View>
          {estadoContable.listaIngresos
            .filter((ingreso) => ingreso.tipoMoneda === "USD")
            .map((ingreso) => (
              <View key={ingreso.id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{ingreso.denominacion}</Text>
                <Text style={styles.tableCol}>{ingreso.ingreso}</Text>
                <Text style={styles.tableCol}>{ingreso.tipoMoneda}</Text>
                <Text style={styles.tableCol}>{ingreso.subRubro}</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Egresos en Pesos */}
      <View style={styles.section}>
        <Text style={styles.text}>Egresos en Pesos:</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Denom.</Text>
            <Text style={styles.tableCol}>Egreso</Text>
            <Text style={styles.tableCol}>Moneda</Text>
            <Text style={styles.tableCol}>SubRubro</Text>
          </View>
          {estadoContable.listaEgresos
            .filter((egreso) => egreso.tipoMoneda === "UR")
            .map((egreso) => (
              <View key={egreso.id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{egreso.denominacion}</Text>
                <Text style={styles.tableCol}>{egreso.egreso}</Text>
                <Text style={styles.tableCol}>{egreso.tipoMoneda}</Text>
                <Text style={styles.tableCol}>{egreso.subRubro}</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Egresos en Dólares */}
      <View style={styles.section}>
        <Text style={styles.text}>Egresos en Dólares:</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Denom.</Text>
            <Text style={styles.tableCol}>Egreso</Text>
            <Text style={styles.tableCol}>Moneda</Text>
            <Text style={styles.tableCol}>SubRubro</Text>
          </View>
          {estadoContable.listaEgresos
            .filter((egreso) => egreso.tipoMoneda === "USD")
            .map((egreso) => (
              <View key={egreso.id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{egreso.denominacion}</Text>
                <Text style={styles.tableCol}>{egreso.egreso}</Text>
                <Text style={styles.tableCol}>{egreso.tipoMoneda}</Text>
                <Text style={styles.tableCol}>{egreso.subRubro}</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Saldos finales */}
      <View style={styles.section}>
        <Text style={styles.text}>
          Saldo Final en Pesos: {estadoContable.saldoFinalEnPesos}
        </Text>
        <Text style={styles.text}>
          Saldo Final en Dólares: {estadoContable.saldoFinalEnDolares}
        </Text>
      </View>
    </Page>
  </Document>
);

// Componente VerEstadoContable
const VerEstadoContable = ({ isOpen, onClose, estadoContable }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 "></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 max-h-64 mt-60">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6">
            <h3 className="text-2xl font-bold text-black-900 mb-4">
              Detalles del Estado Contable
            </h3>
            <table className="w-full text-left">
              <tbody className="text-gray-600 dark:text-gray-100">
                <tr>
                  <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Fecha:
                  </td>
                  <td className="py-2 px-3">
                    {new Date(estadoContable.fecha).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Ingresos en Pesos */}
            <div className="mt-4">
              <h4 className="font-bold">Ingresos en Pesos:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-3 py-1">Denom.</th>
                    <th className="px-3 py-1">Ingreso</th>
                    <th className="px-3 py-1">Moneda</th>
                    <th className="px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaIngresos
                    .filter((ingreso) => ingreso.tipoMoneda === "UR")
                    .map((ingreso) => (
                      <tr key={ingreso.id}>
                        <td className="px-3 py-1">{ingreso.denominacion}</td>
                        <td className="px-3 py-1">{ingreso.ingreso}</td>
                        <td className="px-3 py-1">{ingreso.tipoMoneda}</td>
                        <td className="px-3 py-1">{ingreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Ingresos en Dólares */}
            <div className="mt-4">
              <h4 className="font-bold">Ingresos en Dólares:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-3 py-1">Denom.</th>
                    <th className="px-3 py-1">Ingreso</th>
                    <th className="px-3 py-1">Moneda</th>
                    <th className="px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaIngresos
                    .filter((ingreso) => ingreso.tipoMoneda === "USD")
                    .map((ingreso) => (
                      <tr key={ingreso.id}>
                        <td className="px-3 py-1">{ingreso.denominacion}</td>
                        <td className="px-3 py-1">{ingreso.ingreso}</td>
                        <td className="px-3 py-1">{ingreso.tipoMoneda}</td>
                        <td className="px-3 py-1">{ingreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Egresos en Pesos */}
            <div className="mt-4">
              <h4 className="font-bold">Egresos en Pesos:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-3 py-1">Denom.</th>
                    <th className="px-3 py-1">Egreso</th>
                    <th className="px-3 py-1">Moneda</th>
                    <th className="px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaEgresos
                    .filter((egreso) => egreso.tipoMoneda === "UR")
                    .map((egreso) => (
                      <tr key={egreso.id}>
                        <td className="px-3 py-1">{egreso.denominacion}</td>
                        <td className="px-3 py-1">{egreso.egreso}</td>
                        <td className="px-3 py-1">{egreso.tipoMoneda}</td>
                        <td className="px-3 py-1">{egreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Egresos en Dólares */}
            <div className="mt-4">
              <h4 className="font-bold">Egresos en Dólares:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-3 py-1">Denom.</th>
                    <th className="px-3 py-1">Egreso</th>
                    <th className="px-3 py-1">Moneda</th>
                    <th className="px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaEgresos
                    .filter((egreso) => egreso.tipoMoneda === "USD")
                    .map((egreso) => (
                      <tr key={egreso.id}>
                        <td className="px-3 py-1">{egreso.denominacion}</td>
                        <td className="px-3 py-1">{egreso.egreso}</td>
                        <td className="px-3 py-1">{egreso.tipoMoneda}</td>
                        <td className="px-3 py-1">{egreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Saldos finales */}
            <div className="mt-6">
              <p className="text-sm font-medium">
                Saldo Final en Pesos: {estadoContable.saldoFinalEnPesos}
              </p>
              <p className="text-sm font-medium">
                Saldo Final en Dólares: {estadoContable.saldoFinalEnDolares}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
              onClick={onClose}
            >
              Cerrar
            </button>

            {/* Botón para descargar el PDF */}
            <PDFDownloadLink
              document={<MyDocument estadoContable={estadoContable} />}
              fileName="estado-contable.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out"
                  >
                    Generando PDF...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out"
                  >
                    Descargar PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerEstadoContable;
