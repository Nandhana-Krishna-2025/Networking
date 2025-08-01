import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const ItemSeparator = () => <View style={styles.separator} />;

const App = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing,setRefreshing] =useState<boolean>(false)

  const [postTitle,setPostTitle]= useState("")
  const [postBody,setPostBody] = useState("")
  const [isPosting,setIsPosting]= useState(false)

  const fetchData = async (_limit = 10) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${_limit}`);
      const data: Post[] = await response.json();
      setPostList(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh =()=>{
    setRefreshing(true);
    fetchData(10);
    setRefreshing(false);
  }

  const addPost = async () =>{
    setIsPosting(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
            'Content-type': 'application/json'
          },
      body:JSON.stringify({
        title:postTitle,
        body:postBody
      })
  })
  const newPost = await response.json()
  
  setPostList([newPost,...postList])
  setPostTitle("")
  setPostBody("")
  setIsPosting(false)
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input} 
        placeholder='Post title' 
        value={postTitle}
        onChangeText={setPostTitle} />
        <TextInput 
        style={styles.input} 
        placeholder='Post body' 
        value={postBody} 
        onChangeText={setPostBody} />
       <Button  title={isPosting?'Adding...':'AddPost'} onPress={addPost} disabled={isPosting}/>

      </View>
      <StatusBar barStyle="dark-content" />
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={postList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.bodyText}>{item.body}</Text>
              </View>
            )}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={
              <Text style={styles.EmptyComponent}>
                No posts found
              </Text>
            }
            ListHeaderComponent={
              <Text style={styles.ListHeaderComponent}>
                Posts
              </Text>
            }
            ListFooterComponent={
              <Text style={styles.ListFooterComponent}>
                End of post list
              </Text>
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
      </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 15,
    color: "#555",
  },
  EmptyComponent:{
     textAlign: 'center',
     marginTop: 20, 
  },
  ListHeaderComponent :{
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10,
    textAlign:'center',
  },
  ListFooterComponent:{
    textAlign: 'center', 
    marginVertical: 10 ,
    fontWeight:'bold',
  },
  separator:{
    height:16,
  },
  inputContainer:{
    backgroundColor:"white",
    padding:16,
    borderRadius:8,
    borderWidth:1,
    margin:16,
  },
  input:{
    height:40,
    borderColor:'grey',
    borderWidth:1,
    marginBottom:8,
    borderRadius:8,
    padding:8,
  }
});

export default App;
