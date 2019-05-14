import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, ScrollView} from "react-native";
import {Group, Text} from "./globalStyles";
import styled from "styled-components/native";

class ScoreBoardScreen extends Component {
    render() {
        const {game: {players}} = this.props;
        const containerWidth = (Dimensions.get('window').width - 32) / players.length; //32 = 16 de padding do MainContainer e +16 do RodadaContainer
        return (
            <ScrollView>
                <ScoreView>
                    <>
                        <Group>
                            <RodadaContainer/>
                            {
                                players.map((player) =>
                                    <PlayerContainer width={containerWidth} key={player.index}>
                                        <Text center fs={12}>{player.name}</Text>
                                    </PlayerContainer>
                                )
                            }
                        </Group>
                        {
                            // this.state.rodadaDetails.map(rodada =>
                            //     <Group key={rodada.rodada}>
                            //         <RodadaContainer>
                            //             <Text center>{rodada.rodada}</Text>
                            //         </RodadaContainer>
                            //         {
                            //             rodada.details.map(detail =>
                            //                 <PlayerContainer width={containerWidth} key={detail.index}>
                            //                     <Text center fs={12}>{detail.score} | {detail.palpite}</Text>
                            //                 </PlayerContainer>
                            //             )
                            //         }
                            //     </Group>
                            // )
                        }
                    </>
                </ScoreView>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        game: state
    };
}

export default connect(
    mapStateToProps,
)(ScoreBoardScreen);



const ScoreView = styled.View`
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
`;

const RodadaContainer = styled.View`
    width: 16px;
    min-height: 16px;
`;

const PlayerContainer = styled.View`
    width: ${props => props.width || 50};
    border: 1px solid black;
    overflow: hidden;
`;