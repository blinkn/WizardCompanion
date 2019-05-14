import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, ScrollView} from "react-native";
import {Group, Text} from "./globalStyles";
import styled from "styled-components/native";

class ScoreBoardScreen extends Component {
    render() {
        const {game: {players, rodadaDetails}} = this.props;
        const containerWidth = (Dimensions.get('window').width - 40) / players.length;
        return (
            <ScrollView>
                <Text fs={18} color="white" center>SCORE</Text>
                <ScoreView>
                    <>
                        <Group>
                            <RodadaContainer/>
                            {
                                players.map((player) =>
                                    <PlayerContainerHeader width={containerWidth} key={player.index}>
                                        <Text center fs={12}>{player.name}</Text>
                                    </PlayerContainerHeader>
                                )
                            }
                        </Group>
                        {
                            rodadaDetails.map(rodadaDetail =>
                                <Group key={rodadaDetail.rodada}>
                                    <RodadaContainer>
                                        <Text center>{rodadaDetail.rodada}</Text>
                                    </RodadaContainer>
                                    {
                                        rodadaDetail.details.map(detail =>
                                            <PlayerContainer width={containerWidth} key={detail.index}>
                                                <Text center fs={12}>{detail.score} | {detail.palpite}</Text>
                                            </PlayerContainer>
                                        )
                                    }
                                </Group>
                            )
                        }
                    </>
                </ScoreView>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    game: state
});
export default connect(mapStateToProps)(ScoreBoardScreen);

const ScoreView = styled.View`
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    padding: 4px;
`;

const RodadaContainer = styled.View`
    width: 16px;
    min-height: 16px;
`;

const PlayerContainerHeader = styled.View`
    width: ${props => props.width || 50};
    border-bottom-width: 1px;
    border-bottom-color: #665;
    overflow: hidden;
`;

const PlayerContainer = styled.View`
    width: ${props => props.width || 50};
    overflow: hidden;
`;