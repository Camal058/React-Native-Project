import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import CustomButton from "../components/CustomButton";
import ArrowLeftIcon from "../components/Icons/ArrowLeftIcon";

const DetailScreen = ({ navigation, route }) => {
    const { item } = route.params;

    const [cocktail, setCocktail] = useState(item); 

    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const isFavorite = favorites.some(fav => fav.idDrink === item.idDrink);

    console.log(item);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite(item));
        } else {
            dispatch(addFavorite(item));
        }
    };

    let ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`]; 
        if (ingredient) {
          ingredients.push(ingredient);
        }
    }

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
              const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`);
              setCocktail(response.data.drinks[0]);
            } catch (error) {
              console.error('Error fetching cocktail', error);
            }
        };
      
        fetchCocktail();
      }, [item]);
    
      console.log("cocktail",cocktail)

    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 16, paddingVertical: Platform.OS === 'android' ? 48 : 0, justifyContent: 'space-between', height: '100%'}}>
                <View style={{gap: 48}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                        <TouchableOpacity style={{width: 24, height: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
                            <ArrowLeftIcon/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 24, fontWeight: '600'}}>Details</Text>
                    </View>
                    <View style={{gap: 8}}>
                        <Text style={{fontSize: 22, fontWeight: '500'}}>{cocktail?.strDrink}</Text>
                        <Image
                            source={{ uri: cocktail?.strDrinkThumb }}
                            style={{ width: 200, height: 200 }}/>
                        <Text style={{ fontSize: 24, fontWeight: '500' }}>Ingredients</Text>
                        {ingredients.map((ingredient, index) => (
                          <Text key={index} style={{ fontSize: 15, fontWeight: '400' }}>
                            {ingredient}
                           </Text>
                        ))}
                        <Text style={{ fontSize: 24, fontWeight: '500' }}>Instructions</Text>
                        <Text style={{ fontSize: 15, fontWeight: '400' }}>{cocktail?.strInstructions}</Text>
                    </View>
                </View>
                <CustomButton
                    label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    handleOnPress={handleFavoriteToggle}
                    type={"secondary"}
                />
            </View>
            {/* {
            "strDrink": "9 1/2 Weeks",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg",
            "idDrink": "16108"
        },
        {
            "strDrink": "A Day at the Beach",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/trptts1454514474.jpg",
            "idDrink": "15200"
        },
        {
            "strDrink": "A Furlong Too Late",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/ssxvww1472669166.jpg",
            "idDrink": "17831"
        }, */}
        </SafeAreaView>
    );
};


export default DetailScreen;