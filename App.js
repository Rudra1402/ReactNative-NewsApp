import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Modal, SafeAreaView, Image, Linking, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [news, setNews] = useState([])
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchNews = async (c) => {
    setLoading(true)
    const api = `https://saurav.tech/NewsAPI/top-headlines/category/${c}/in.json`
    await fetch(api)
      .then(r => r.json())
      .then(d => {
        setNews(d.articles)
        setLoading(false)
      })
      .catch(e => {
        alert(e.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchNews('general')
    setActive(3)
  }, [])

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView contentContainerStyle={styles.navScroll} horizontal={true}>
        <View style={active === 1 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(1)
              fetchNews('business')
            }}
          >Business</Text>
        </View>
        <View style={active === 2 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(2)
              fetchNews('entertainment')
            }}
          >Entertainment</Text>
        </View>
        <View style={active === 3 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(3)
              fetchNews('general')
            }}
          >General</Text>
        </View>
        <View style={active === 4 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(4)
              fetchNews('health')
            }}
          >Health</Text>
        </View>
        <View style={active === 5 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(5)
              fetchNews('science')
            }}
          >Science</Text>
        </View>
        <View style={active === 6 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(6)
              fetchNews('sports')
            }}
          >Sports</Text>
        </View>
        <View style={active === 7 ? styles.selected : styles.notSelected}>
          <Text
            style={styles.navElem}
            onPress={() => {
              setActive(7)
              fetchNews('technology')
            }}
          >Technology</Text>
        </View>
      </ScrollView>
      {!loading ? <ScrollView contentContainerStyle={styles.newsContain}>
        {news.map((n, index) => (
          <View key={index} style={styles.news}>
            <Image
              style={{ height: 100, width: "auto", borderRadius: 8, marginBottom: 2 }}
              source={{
                uri: n.urlToImage ? n.urlToImage : 'https://avatar.net.in/Content/img/no-image-found.png'
              }}
            />
            <Text style={[styles.text, { fontSize: 12, color: "#fff8" }]}>{n.source.name}</Text>
            <Text style={[styles.text, { fontSize: 20 }]} numberOfLines={2}>{n.title}</Text>
            <Text style={[styles.text, { fontSize: 12, textAlign: "right", color: "#fff8" }]}>by {n.author ? n.author : 'Unknown'}</Text>
            <Text style={[styles.text, { fontSize: 14 }]} numberOfLines={5}>{n.description}</Text>
            <Text
              style={[styles.text, { fontSize: 14, color: "lightgreen" }]}
              onPress={() => Linking.openURL(n.url)}
            >Visit News Page &#8599;</Text>
            <Text style={[styles.text, { fontSize: 12, color: "#fff8", letterSpacing: 0.5 }]}>{new Date(n.publishedAt).toLocaleTimeString() + '\n' + new Date(n.publishedAt).toLocaleDateString()}</Text>
            <Pressable
              style={styles.viewMore}
              onPress={() => {
                setModalData(n)
                setModal(true)
              }}
            >
              <Text style={styles.viewMoreText}>View More</Text>
            </Pressable>
            {modal && <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                setModal(false)
              }}
            >
              <SafeAreaView style={styles.modalContainer}>
                <ScrollView style={{ width: "100%" }}>
                  <Image
                    style={{ height: 250, width: "auto", borderRadius: 8, marginBottom: 2, marginHorizontal: 20 }}
                    source={{
                      uri: modalData.urlToImage ? modalData.urlToImage : 'https://avatar.net.in/Content/img/no-image-found.png'
                    }}
                  />
                  <Text style={[styles.text, { fontSize: 16, color: "#0008", marginHorizontal: 20 }]}>Source - {modalData.source.name}</Text>
                  <Text style={{ fontSize: 26, marginVertical: 5, color: "000", marginHorizontal: 20 }}>{modalData.title}</Text>
                  <Text style={[styles.text, { fontSize: 16, textAlign: "right", color: "#0008", marginHorizontal: 20 }]}>by {modalData.author ? modalData.author : 'Unknown'}</Text>
                  <Text style={{ fontSize: 18, marginVertical: 5, color: "#000", marginHorizontal: 20, fontStyle: "italic" }}>{modalData.description}</Text>
                  <Text
                    style={{ fontSize: 16, color: "blueviolet", marginHorizontal: 20, marginVertical: 5 }}
                    onPress={() => Linking.openURL(modalData.url)}
                  >Visit News Page &#8599;</Text>
                  <Text style={[styles.text, { fontSize: 14, color: "#0008", letterSpacing: 0.5, marginHorizontal: 20 }]}>Published At : {new Date(modalData.publishedAt).toLocaleTimeString() + ' - ' + new Date(modalData.publishedAt).toLocaleDateString()}</Text>
                </ScrollView>
                <Pressable
                  style={styles.closeBtn}
                  onPress={() => setModal(false)}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </Pressable>
              </SafeAreaView>
            </Modal>}
          </View>
        ))}
      </ScrollView> : <View style={{ flexGrow: 1 }}>
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>Loading...</Text>
      </View>}
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123456',
  },
  newsContain: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10
  },
  news: {
    width: "45%",
    borderWidth: 0.3,
    borderColor: "#fff3",
    padding: 10,
    margin: 7.5,
    borderRadius: 10
  },
  text: {
    color: "white",
    marginVertical: 4
  },
  navScroll: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  navElem: {
    fontSize: 18,
    marginHorizontal: 10,
    paddingVertical: 10,
    color: "#fffd"
  },
  viewMore: {
    marginTop: 8,
    backgroundColor: "#cc1240cc",
    borderRadius: 5,
  },
  viewMoreText: {
    paddingVertical: 8,
    textAlign: "center",
    color: "#fff",
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  closeBtn: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  closeBtnText: {
    backgroundColor: "orangered",
    color: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "orangered",
    overflow: "hidden",
    textAlign: "center",
    fontSize: 16,
    padding: 10
  },
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: "lightcoral",
    borderRadius: 10
  },
  notSelected: {
    borderBottomColor: 0
  }
});
