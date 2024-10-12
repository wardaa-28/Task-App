import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import newTheme from '../utils/Contants';
import LinearGradient from 'react-native-linear-gradient';
import CustomRBSheet from '../components/CustomRBSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../utils/Styles';
const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [selectedTask, setSelectedTask] = useState(null); 
    const [editedTaskName, setEditedTaskName] = useState(''); 
    const bottomSheetRef = useRef(null);
    const taskDetailsRef = useRef(null); 
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@todo_list');
            if (jsonValue != null) {
                setData(JSON.parse(jsonValue));
            } else {
                setData([]);
            }
        } catch (e) {
            console.log("Failed to load saved tasks");
        }
    };
    const saveData = async (updatedData) => {
        try {
            const jsonValue = JSON.stringify(updatedData);
            await AsyncStorage.setItem('@todo_list', jsonValue);
        } catch (e) {
            console.log("Failed to save the task");
        }
    };
    const addTask = () => {
        if (newTask.trim().length > 0) {
            const newList = { name: newTask, completed: false };
            const updatedData = Array.isArray(data) ? [...data, newList] : [newList];
            setData(updatedData);
            saveData(updatedData);
            setNewTask('');
            bottomSheetRef.current.close();
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedData = [...data];
        updatedData[index].completed = !updatedData[index].completed; 
        setData(updatedData);
        saveData(updatedData);
    };

    const deleteTask = (index) => {
        const updatedData = data.filter((i) => i !== index); 
        setData(updatedData);
        saveData(updatedData);
    };

    const showTaskDetails = (task) => {
        setSelectedTask(task); 
        setEditedTaskName(task.name); 
        taskDetailsRef.current.open(); 
    };

    const saveEditedTask = () => {
        const updatedData = data.map(task => {
            if (task === selectedTask) {
                return { ...task, name: editedTaskName };
            }
            return task;
        });
        setData(updatedData);
        saveData(updatedData);
        taskDetailsRef.current.close(); 
    };

    const incompleteCount = data.filter(task => !task.completed).length;
    return (
        <View style={Styles.mainBox}>
            <LinearGradient colors={[newTheme.color1, newTheme.color2]} style={Styles.gradient}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
                        <Text style={Styles.heading}>
                            Manage your task well
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../images/arrow.png')} style={Styles.img1} resizeMode='contain' />
                        <Image source={require('../images/book.png')} style={Styles.img2} resizeMode='contain' />
                    </View>
                </View>
            </LinearGradient>
            {incompleteCount > 0 ? (
                <Text style={[Styles.mediumText, { fontFamily: newTheme.semiBold, margin: 8 }]}>
                    You have {incompleteCount} tasks to complete
                </Text>
            ) : null}
            <View style={Styles.flatlistView}>
                {data.length === 0 ? (
                    <View style={Styles.align}>
                        <Image source={require('../images/notepad.png')} style={{ width: "100%", height: 100 }} resizeMode='contain' />
                        <Text style={Styles.mediumText}>No tasks found</Text>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.taskItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
                                        <Feather name={item.completed ? 'check-circle' : 'circle'} size={24} color={item.completed ? newTheme.color1 : newTheme.grey} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => showTaskDetails(item)}>
                                        <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => deleteTask(index)}>
                                    <Feather name='trash-2' size={20} color={newTheme.grey} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => bottomSheetRef.current.open()}
            >
                <Feather name={'plus'} size={24} color={newTheme.white} />
            </TouchableOpacity>

            <CustomRBSheet Sheet={bottomSheetRef} View={
                <View style={Styles.bottomSheetContainer}>
                    <Text style={[Styles.mediumText,{fontFamily:newTheme.bold}]}>Add New Task</Text>
                    <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
                        <TextInput
                            style={Styles.input}
                            value={newTask}
                            onChangeText={text => setNewTask(text)}
                            placeholder="Enter task name"
                            placeholderTextColor={newTheme.black}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={addTask}>
                            <Text style={[Styles.mediumText,{color:newTheme.white}]}>Save Task</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            } />
            <CustomRBSheet Sheet={taskDetailsRef} View={
                <View style={Styles.bottomSheetContainer}>
                    <Text style={[Styles.mediumText,{fontFamily:newTheme.bold}]}>Task Details</Text>
                    {selectedTask && (
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={Styles.mediumText}>Completed: {selectedTask.completed ? 'Yes' : 'No'}</Text>
                            <TextInput
                                style={Styles.input}
                                value={editedTaskName}
                                onChangeText={setEditedTaskName}
                                placeholder="Edit task name"
                            placeholderTextColor={newTheme.black}
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={saveEditedTask}>
                                <Text style={[Styles.mediumText,{color:newTheme.white}]}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            } />
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    addButton: {  backgroundColor: newTheme.color1,  width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30, right: 30, },
    inputContainer: { flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', },
    saveButton: { backgroundColor: newTheme.color2, borderRadius: 10, padding:10, margin:5, width:'95%', justifyContent:'center', alignItems:'center'},
    taskItem: { backgroundColor: newTheme.white, padding: 10, borderRadius: 10, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  elevation: 4, shadowColor: newTheme.color2, },
    taskText: { fontSize: 16, fontFamily: newTheme.regular, color: newTheme.black,  flex: 1,  marginLeft: 10, },
    completedTask: {  textDecorationLine: 'line-through',   color: newTheme.grey,  }
});

