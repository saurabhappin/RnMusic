import { Image, ImageURISource, StyleSheet } from 'react-native';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import MapView from 'react-native-map-clustering';
import { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
//Util Imports.
// import { ColourType, CoordinatedType } from '@loginext/modals';
// import fonts from '@loginext/utils/fonts';
// import localImages from '@loginext/utils/localImages';
// import { useAppSelector } from '@loginext/hooks/app-hooks';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { screenHeight, vh, vw } from '@loginext/utils/dimenstions';
// import common from '@loginext/utils/common';

type MapViewClusteringProps = {
    initialRegion?: CoordinatedType
    mapRef: MutableRefObject<MapView | undefined>
    coordinateDataArray?: Array<CoordinatedType>
    markerImage?: ImageURISource,
    onMapReady?: Function
    onMarkerClick?: (index: number) => void
    renderMarkersComp?: () => React.JSX.Element
    clusterColor?: string
    clusterFontFamily?: string
    clusterTextColor?: string
    isPolylined?: boolean
    clusteringEnabled?: boolean
    renderPolyline?: () => React.JSX.Element
    renderCircleWithMarker?: () => React.JSX.Element
    renderHeatMap?: () => React.JSX.Element
    renderPolygon?: () => React.JSX.Element
    onPressMap?: (coordinates: Object) => void
    isSearchEnabled?: boolean
    onPressSearchedLoc?: (coordinates: GooglePlaceData, location: GooglePlaceDetail | null) => void
};
export const MapViewClustering = React.memo((props: MapViewClusteringProps) => {
    const {
        initialRegion,
        mapRef,
        coordinateDataArray,
        markerImage,
        onMapReady,
        onMarkerClick,
        renderMarkersComp,
        clusterColor,
        clusterFontFamily,
        clusterTextColor,
        isPolylined = false,
        clusteringEnabled = true,
        renderPolyline,
        renderCircleWithMarker,
        renderHeatMap,
        renderPolygon,
        onPressMap,
        isSearchEnabled = false,
        onPressSearchedLoc = () => { },
    } = props;
    const { countryLatLng } = useSelector((state) => state?.auth);
    const [mapCoordinates, setMapCoordinates] = useState<Array<CoordinatedType>>(coordinateDataArray ?? []);
    const [isMapReady, setIsMapReady] = useState<Boolean>(false);
    const [INITIAL_REGION, setINITIAL_REGION] = useState<CoordinatedType>({});
    const superClusterRef = useRef();
    const COLORS = useTheme()?.colors as ColourType;
    const styles = style(COLORS);

    useEffect(() => {
        if (countryLatLng?.length) {
            let initailLatLng = countryLatLng?.replace(' ', '')?.split(',');
            setINITIAL_REGION({
                latitude: +(initailLatLng?.[0]),
                longitude: +(initailLatLng?.[1]),
            });
        }
    }, [countryLatLng]);
    useEffect(() => {
        if (coordinateDataArray) { setMapCoordinates(coordinateDataArray); }
    }, [coordinateDataArray]);

    const _renderMarkers = () => {
        if (renderMarkersComp) {
            return renderMarkersComp?.();
        } else {
            return mapCoordinates?.map((itemCords: CoordinatedType, index: number) => {
                if (itemCords?.latitude || itemCords?.lat) {
                    return <Marker
                        key={index}
                        coordinate={{
                            latitude: itemCords?.latitude ?? itemCords?.lat ?? INITIAL_REGION?.latitude,
                            longitude: itemCords?.longitude ?? itemCords?.lng ?? INITIAL_REGION?.longitude,
                        }}
                        identifier={itemCords?.markerType}
                        icon={(markerImage) ?? (itemCords?.markerType === 'PICKUP' ? localImages?.profile : localImages?.deliveryStatusIcon)}
                        removeClippedSubviews
                        tracksViewChanges={false}
                        onPress={() => onMarkerClick?.(index)}
                    />;
                } else { return <></>; }
            });
        }

    };

    const _renderPolyLine = () => {
        if (renderPolyline) {
            return renderPolyline?.();
        } else {
            return <></>;
        }
    };

    const _onMapReady = useCallback(() => {
        setTimeout(() => {
            onMapReady?.();
            setIsMapReady(true);
        }, 1000);
    }, [isMapReady]);

    const _onPressMap = (e: MapPressEvent) => {
        onPressMap?.(e.nativeEvent.coordinate);
    };

    return (
        <>
            {isSearchEnabled ? <GooglePlacesAutocomplete
                placeholder="Search location to geocode"
                numberOfLines={2}
                onPress={onPressSearchedLoc}
                textInputProps={{ placeholderTextColor: COLORS?.searchBarPlaceHolder }}
                styles={{
                    textInput: styles.searchTextInput,
                    listView: styles.searchList,
                    textInputContainer: styles.containerStyle,
                    separator: styles.sep,
                    description: styles.description,
                }}
                renderLeftButton={() => <Image source={localImages?.searchIcon} style={styles.searchIcon} />}
                query={{
                    key: common.MAP_API_KEY,
                    language: 'en',
                }}
                nearbyPlacesAPI={'GooglePlacesSearch'}
                fetchDetails={true}
                listViewDisplayed={false}
                debounce={500}
            /> : null}
            {Object?.keys(INITIAL_REGION)?.length ?
                //@ts-ignore
                <MapView
                    ref={mapRef}
                    clusteringEnabled={clusteringEnabled}
                    initialRegion={
                        initialRegion && initialRegion?.latitude > 0 ?
                            {
                                ...initialRegion,
                                latitudeDelta: 0.5,
                                longitudeDelta: 0.5,
                            }
                            : {
                                ...INITIAL_REGION,
                                latitudeDelta: 0.5,
                                longitudeDelta: 0.5,
                            }}
                    style={styles.mapView}
                    clusterColor={clusterColor ?? COLORS?.ORANGE_DARK}
                    clusterTextColor={clusterTextColor ?? COLORS?.white}
                    clusterFontFamily={clusterFontFamily ?? fonts?.MEDIUM}
                    superClusterRef={superClusterRef}
                    onMapReady={_onMapReady}
                    provider={PROVIDER_GOOGLE}
                    removeClippedSubviews
                    tracksViewChanges={false}
                    onPress={_onPressMap}
                >
                    {
                        isMapReady ?
                            _renderMarkers()
                            : null
                    }
                    {
                        isMapReady ?
                            isPolylined ?
                                _renderPolyLine()
                                : null
                            : null
                    }
                    {
                        isMapReady ? renderCircleWithMarker?.()
                            : null
                    }
                    {
                        isMapReady ? renderHeatMap?.()
                            : null
                    }
                    {
                        isMapReady ? renderPolygon?.()
                            : null
                    }
                </MapView>
                : <></>
            }
        </>
    );
});

const style = (COLORS: ColourType) => StyleSheet.create({
    mapView: {
        ...StyleSheet.absoluteFillObject,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    },
    searchTextInput: {
        backgroundColor: `${COLORS?.white}`,
        color: COLORS?.black,
        fontFamily: fonts?.REGULAR,
        fontSize: vw(16),
        borderRadius: vw(28),
        paddingLeft: vw(50),
        paddingRight: vw(10),
        height: vh(56),
        elevation: 3,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowColor: COLORS.grey,
    },
    searchList: {
        maxHeight: vh(screenHeight / 3),
        width: vw(382),
        alignSelf: 'center',
        color: COLORS?.fixBlack,
    },
    containerStyle: {
        width: vw(380),
        alignSelf: 'center',
        marginTop: vh(16),
        borderRadius: vw(28),
        elevation: vw(4),
        shadowColor: COLORS?.black,
        shadowOffset: { width: 0, height: vw(2) },
        shadowOpacity: vw(0.4),
        shadowRadius: vw(3),
    },
    sep: {
        backgroundColor: COLORS?.inactiveBarColor,
        borderTopWidth: vw(0),
    },
    description: {
        color: COLORS?.fixBlack,
        fontSize: vw(14),
        borderWidth: 0,
        width: vw(350),
    },

    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        left: vw(15),
        top: vh(18),
        width: vw(20),
        height: vw(20),
        tintColor: COLORS?.secondary10,
    },
});
