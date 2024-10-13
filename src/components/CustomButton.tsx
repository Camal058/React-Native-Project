import React from 'react';
import {TouchableOpacity,Text} from "react-native";

interface Props {
    handleOnPress: () => void;
    label: string;
    type?: 'secondary'
}
const CustomButton = (props: Props) => {

    const {handleOnPress,label,type} = props;

    return (
        <TouchableOpacity style={{height: 56, backgroundColor: type === 'secondary' ? 'transparent' : '#006FFD', alignItems: 'center', justifyContent: 'center', borderRadius: 12, borderWidth: type === 'secondary' ? 1 : 0, borderColor: '#006FFD' }} onPress={handleOnPress}>
            <Text style={{color:type === 'secondary' ? '#006FFD' : 'white', fontSize: 16}}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;