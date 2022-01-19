import styled from 'styled-components/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import theme from '../../global/styles/theme';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: ${RFValue(300)}px;
`;

export const Teste = styled.View`
  width: 100%;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 10px;
  margin-top: ${getStatusBarHeight() + 30}px;
`;

export const Button = styled.Pressable`
  background: ${({ theme }) => theme.colors.red};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const FavoriteButton = styled.Pressable`
  background: ${({ theme }) => theme.colors.red};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Icon = styled(Feather).attrs({
  size: 24,
  color: theme.colors.white,
})``;

export const MovieContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  padding: 0px 24px;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: ${getBottomSpace()}px;
  margin-top: 12px;
`;

export const MovieSectionTitle = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  margin-bottom: 10px;
  font-weight: bold;
`;

export const MovieText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.gray};
`;

export const MovieInfo = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 5px;
`;

export const LoadingContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: theme.colors.red,
})``;
