import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import axios from 'axios';
import CustomButton from "../components/CustomButton";
import HeartIcon from "../components/Icons/HeartIcon";
import FilterIcon from "../components/Icons/FilterIcon";

const HomeScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState('All');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const searchCocktails = async (filter_) => {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;

        if (filter_ !== 'All') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filter_}`;
        } else if (query) {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        } else {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get(url);
            setResults(response.data.drinks || []);
        } catch (error) {
            console.error('Error fetching cocktails', error);
        }
    };

    const getRandomCocktail = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            setResults([response.data.drinks[0]]);
        } catch (error) {
            console.error('Error fetching random cocktail', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };


    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 48 : 0 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>Home</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                        <HeartIcon />
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 16, marginTop: 32 }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <TextInput
                            style={{ borderRadius: 12, height: 56, borderWidth: 1, borderColor: '#C5C6CC', paddingHorizontal: 12, flex: 3 }}
                            placeholder="Search for cocktails"
                            value={query}
                            onChangeText={setQuery}
                        />
                        <TouchableOpacity onPress={toggleDropdown}>
                            <FilterIcon/>
                        </TouchableOpacity>
                    </View>


                    {dropdownVisible && (
                        <View style={styles.dropdownContainer}>
                            <TouchableOpacity onPress={() => { setFilter('Alcoholic'); setDropdownVisible(false); searchCocktails('Alcoholic') }}>
                                <Text style={styles.dropdownItem}>Alcoholic</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilter('Non_Alcoholic'); setDropdownVisible(false); searchCocktails('Non_Alcoholic') }}>
                                <Text style={styles.dropdownItem}>Non-Alcoholic</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <CustomButton label="Search" handleOnPress={() => {setFilter('All');searchCocktails('All')}} />
                    <CustomButton type={'secondary'} label="Random Cocktail" handleOnPress={getRandomCocktail} />
                </View>

                <View style={{ marginTop: 16, gap: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Found: {results?.length || 0} ({filter})</Text>
                    <ScrollView style={{ height: '55%' }} contentContainerStyle={{ gap: 8 }}>
                        {Array.isArray(results) && results?.map((item) => (
                            <>
                                <Text key={item.idDrink} onPress={() => navigation.navigate('Detail', { item })}>
                                    {item.strDrink}
                                </Text>
                            </>


                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dropdownButton: {
        backgroundColor: '#C5C6CC',
        paddingVertical: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 8,
        padding: 8,
        position: 'absolute',
        top: 60,
        right: 0,
        zIndex: 10,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    }
});

export default HomeScreen;
