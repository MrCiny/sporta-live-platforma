import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "@/components/themeContext";
//import { getStyles } from "@/styles/styles";

export default function UserHandbook() {
  const { theme } = useTheme?.() || {};
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>📘 User Handbook</Text>

        <Text style={styles.sectionTitle}>1. Skatīties spēļu tiešraides</Text>
        <Text style={styles.text}>
          Lai skatītu gaidāmās un notiekošās sporta tiešraides, dodieties uz jebkuru no sporta cilnēm. Pieskarieties jebkurai straumei, lai atvērtu spēles lapu un skatītu informāciju par spēlēm.
        </Text>

        <Text style={styles.sectionTitle}>2. Lasīt sporta jaunumus</Text>
        <Text style={styles.text}>
          Lai lasītu jaunākos sporta ziņu rakstus, dodieties uz jebkuru no sporta sadaļām. Lai izlasītu pilnu stāstu, varat pieskarties katram rakstam sadaļā "Sporta ziņas".
        </Text>

        <Text style={styles.sectionTitle}>3. Izveidot jaunu spēli vai rakstu (Administratori tikai)</Text>
        <Text style={styles.text}>
          Ja esat administrators, dodieties uz jebkuru informācijas paneli un pieskarieties “+ Create, lai pievienotu jaunus rakstus vai komandas.
        </Text>

        <Text style={styles.sectionTitle}>4. Labot savu profilu</Text>
        <Text style={styles.text}>
          Dodieties uz cilni Profils un pieskarieties "Edit", lai mainītu savu vārdu, attēlu vai citus iestatījumus.
        </Text>

        <Text style={styles.sectionTitle}>5. Menedžēt komandas (Administratori tikai)</Text>
        <Text style={styles.text}>
          Sadaļā “Komandas” varat skatīt informāciju par komandām. Administratori var izveidot un atjaunināt komandas no komandas informācijas paneļa.
        </Text>

        <Text style={styles.sectionTitle}>6. Atbalsts</Text>
        <Text style={styles.text}>
          Ja jums nepieciešama palīdzība, sazinieties ar mums pa e-pastu support@sportplatform.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme = "light") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme === "dark" ? "#fff" : "#000968",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginTop: 15,
      marginBottom: 5,
      color: theme === "dark" ? "#f1f1f1" : "#333",
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      color: theme === "dark" ? "#ccc" : "#444",
    },
  });
