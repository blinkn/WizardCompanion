import styled from 'styled-components/native';

export const MainContainer = styled.View`
    flex: 1;
    background-color: ${props => props.bgcolor || 'darkslateblue'};
    padding: 8px;
`;

export const Center = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Button = styled.TouchableOpacity`
    background-color: white;
    color: #000;
    border-radius: 4px;
    padding: 16px;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    opacity: ${props => props.disabled ? '.5' : '1'};
`;

export const ButtonText = styled.Text`
    text-transform: uppercase;
    font-weight: bold;
    color: ${props => props.color || "black"};
`;

export const Group = styled.View`
    flex-direction: ${props => props.vertical ? "column" : "row"};
`;

export const FlexWrapCenter = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap; 
    align-items: center;
    justify-content: center;
`;

export const PlayerBox = styled.View`
    width: 120px;
    height: 140px;
    border-radius: 5px;
    border: 3px solid rgb(58,50,111);
    background-color: #eee;
    overflow: hidden;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    font-size: ${props => props.fs || "12px"};
    text-align: ${props => props.center ? 'center' : 'left'};
    color: ${props => props.color || '#888'};
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    border: ${props => props.debug ? '1px solid red' : '0'};
`;

export const Card = styled.View`
  min-height: 20px;
  background-color: ${props => props.color || 'white'};
  elevation: 2;
  border-radius: 3px;
  margin: 5px 0;
  padding: 8px;
`;