import React from 'react';
import { View, Text, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../store/favoritesSlice';
import CustomButton from "../components/CustomButton";
import ArrowLeftIcon from "../components/Icons/ArrowLeftIcon";
import CloseIcon from "../components/Icons/CloseIcon";

const FavoritesScreen = ({ navigation }) => {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (item) => {
        dispatch(removeFavorite(item));
    };

    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 16, paddingVertical: Platform.OS === 'android' ? 48 : 0, justifyContent: 'space-between', height: '100%' }}>
                <View style={{ gap: 48 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <TouchableOpacity style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                            <ArrowLeftIcon />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>Favorites</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                        {favorites.length > 0 ? (
                            favorites.map((item) => (
                                <View key={item.idDrink} style={{ marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text onPress={() => navigation.navigate('Detail', { item })} style={{ fontSize: 22, fontWeight: '500' }}>{item.strDrink}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
                                        <CloseIcon/>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <Text style={{ fontSize: 18, color: 'gray' }}>No Favorites</Text>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FavoritesScreen;
