import { configureStore } from '@reduxjs/toolkit';
import jurnalGuruReducer from './jurnalRedux';
import kelasReducer from './kelasRedux';
import teacherReducer from './teacherRedux';
import mapelReducer from './mapelRedux';
import profileReducer from './profileRedux';
import storedReducer from './storedRedux';
const store = configureStore({
    reducer: {
        jurnalGuru: jurnalGuruReducer,
        teacher: teacherReducer,
        kelas: kelasReducer,
        mapel: mapelReducer,
        profile: profileReducer,
        stored: storedReducer
    }
});


/*

const cobacoba = useSelector((state) => state.jurnalGuru.data);
|
v
useSelector -> configureStore
|
v
state -> reducer -> {
        jurnalGuru: jurnalGuruReducer,
        teacher: teacherReducer,
        kelas: kelasReducer,
        mapel: mapelReducer,
        profile: profileReducer,
}
|
v
jurnalGuru -> initialState


*/


/*
[1,2,3,4,5,6,7,8,9,10]
setState<--------
|               |
|               |
processs--------|

Redux
|                                                  Page 1         Page 2        Page 3
Initial State
|
v
Reducer -> Membungkus Initial State
|
v
Store
|



State Biasa

processs
|
v
setState

Page<------------
                |
Initial State   |
|               |
v               |
Store           |
|               |
-----------------



*/

export default store;