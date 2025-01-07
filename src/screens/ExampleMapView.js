

//Example Usage MapView Clustering
<MapViewClustering
    initialRegion={{
        latitude: runSheetCoords?.[0]?.latitude ?? 28.7041,
        longitude: runSheetCoords?.[0]?.longitude ?? 77.1025,
    }}
    mapRef={mapRef}
    isPolylined={true}
    renderPolyline={renderPolyline}
    renderMarkersComp={renderMarkers}
/>

//Polyline and Markers rendering example functions:
const renderPolyline = useCallback(() => {
  const runCoords = runSheetCoords
      .filter((info) => typeof info.latitude === 'number' && typeof info.longitude === 'number')


  if (runCoords && runCoords?.length > 0) {
      return Platform.OS === 'android' ? <Polyline
          coordinates={runCoords}
          strokeColor={COLORS?.ORANGE_DARK}
          strokeWidth={3}
          lineDashPattern={[5, 5]}
      /> : <Polyline
          coordinates={runCoords}
          strokeColor={COLORS?.ORANGE_DARK}
          strokeWidth={3}
      />
  } else {
      return <></>
  }
}, [runSheet, runSheetCoords]);

const renderMarkers = useCallback(() => {

  return runSheetCoords?.map((item: CoordinatedType, index: number) => {
      const onMarkerClick = () => {
          mapRef?.current?.animateToRegion({
              latitude: item?.latitude,
              longitude: item?.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03
          }, 1000);
      };
      return (<Marker
          key={index}
          coordinate={item}
          onPress={onMarkerClick}
          removeClippedSubviews={true}
          tracksViewChanges={false}
      >
          {
              item?.markerType === "PICKUPLOCATION"
                  ? <View style={styles.pickupmarkerView} >
                      <Text style={styles.markerText}>{'P'}</Text>
                      <Text style={styles.markerText}>{item?.extraInfo?.deliveryOrder}</Text>
                  </View>
                  : <View style={styles.deliverymarkerView} >
                      <Text style={styles.markerText}>{'D'}</Text>
                      <Text style={styles.markerText}>{item?.extraInfo?.deliveryOrder}</Text>
                  </View>
          }
      </Marker>)
  });

}, [runSheetCoords]);
