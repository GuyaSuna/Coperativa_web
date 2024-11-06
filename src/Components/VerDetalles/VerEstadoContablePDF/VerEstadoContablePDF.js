import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

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

const MyDocument = ({ estadoContable }) => (
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text style={styles.header}>Detalles del Estado Contable</Text>
      <Text style={styles.text}>
        Fecha: {new Date(estadoContable.fecha).toLocaleDateString()}
      </Text>
    </View>

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
          .filter((ingreso) => ingreso.tipoMoneda === "UYU")
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
          .filter((egreso) => egreso.tipoMoneda === "UYU")
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

const VerEstadoContable = ({ isOpen, onClose, estadoContable }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 max-h-full p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-4 md:p-6 overflow-y-auto max-h-[90vh]">
          <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
            <h3 className="text-lg md:text-2xl font-bold text-black-900 mb-4">
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
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="overflow-y-auto pr-2 max-h-64">
              <h4 className="font-bold text-base md:text-lg">Ingresos en Pesos:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-2 md:px-3 py-1">Denom.</th>
                    <th className="px-2 md:px-3 py-1">Ingreso</th>
                    <th className="px-2 md:px-3 py-1">Moneda</th>
                    <th className="px-2 md:px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaIngresos
                    .filter((ingreso) => ingreso.tipoMoneda === "UYU")
                    .map((ingreso) => (
                      <tr key={ingreso.id}>
                        <td className="px-2 md:px-3 py-1">{ingreso.denominacion}</td>
                        <td className="px-2 md:px-3 py-1">{ingreso.ingreso}</td>
                        <td className="px-2 md:px-3 py-1">{ingreso.tipoMoneda}</td>
                        <td className="px-2 md:px-3 py-1">{ingreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <h4 className="font-bold mt-4 text-base md:text-lg">Ingresos en Dólares:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-2 md:px-3 py-1">Denom.</th>
                    <th className="px-2 md:px-3 py-1">Ingreso</th>
                    <th className="px-2 md:px-3 py-1">Moneda</th>
                    <th className="px-2 md:px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaIngresos
                    .filter((ingreso) => ingreso.tipoMoneda === "USD")
                    .map((ingreso) => (
                      <tr key={ingreso.id}>
                        <td className="px-2 md:px-3 py-1">{ingreso.denominacion}</td>
                        <td className="px-2 md:px-3 py-1">{ingreso.ingreso}</td>
                        <td className="px-2 md:px-3 py-1">{ingreso.tipoMoneda}</td>
                        <td className="px-2 md:px-3 py-1">{ingreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-y-auto pl-2 max-h-64">
              <h4 className="font-bold text-base md:text-lg">Egresos en Pesos:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-2 md:px-3 py-1">Denom.</th>
                    <th className="px-2 md:px-3 py-1">Egreso</th>
                    <th className="px-2 md:px-3 py-1">Moneda</th>
                    <th className="px-2 md:px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaEgresos
                    .filter((egreso) => egreso.tipoMoneda === "UYU")
                    .map((egreso) => (
                      <tr key={egreso.id}>
                        <td className="px-2 md:px-3 py-1">{egreso.denominacion}</td>
                        <td className="px-2 md:px-3 py-1">{egreso.egreso}</td>
                        <td className="px-2 md:px-3 py-1">{egreso.tipoMoneda}</td>
                        <td className="px-2 md:px-3 py-1">{egreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <h4 className="font-bold mt-4 text-base md:text-lg">Egresos en Dólares:</h4>
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-2 md:px-3 py-1">Denom.</th>
                    <th className="px-2 md:px-3 py-1">Egreso</th>
                    <th className="px-2 md:px-3 py-1">Moneda</th>
                    <th className="px-2 md:px-3 py-1">SubRubro</th>
                  </tr>
                </thead>
                <tbody>
                  {estadoContable.listaEgresos
                    .filter((egreso) => egreso.tipoMoneda === "USD")
                    .map((egreso) => (
                      <tr key={egreso.id}>
                        <td className="px-2 md:px-3 py-1">{egreso.denominacion}</td>
                        <td className="px-2 md:px-3 py-1">{egreso.egreso}</td>
                        <td className="px-2 md:px-3 py-1">{egreso.tipoMoneda}</td>
                        <td className="px-2 md:px-3 py-1">{egreso.subRubro}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm md:text-base font-medium">
              Saldo Final en Pesos: {estadoContable.saldoFinalEnPesos}
            </p>
            <p className="text-sm md:text-base font-medium">
              Saldo Final en Dólares: {estadoContable.saldoFinalEnDolares}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <PDFDownloadLink
              document={<MyDocument estadoContable={estadoContable} />}
              fileName="estado-contable.pdf"
            >
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Descargar PDF
              </button>
            </PDFDownloadLink>
            <button
              onClick={onClose}
              className="ml-4 px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerEstadoContable;
