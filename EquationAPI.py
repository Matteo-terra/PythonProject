from unittest import result
from math import sqrt
from codecarbon import OfflineEmissionsTracker
from flask import request, jsonify

dTc = 0
dt = 0
ws = 0
Tc = 0
Ta = 0
intensite = 0

def equation(ws = 0, Tc = 0, Ta = 0, intensite = 0):
    resultat = ((-(ws*ws)/1600*0.4)-0.1)*(Tc-Ta-((intensite**1.4)/73785)*130)
    return resultat/60

def increment(T0, ws, Ta, intensite,temps):
    rangeTemps = range(1,temps*60)
    result = {}
    for i in rangeTemps:
        T0 = T0 + equation(ws, T0, Ta, intensite)
        if i%60 == 0 : 
            result[i] = T0
    return result

def calculTemp(T0, ws, Ta, intensite,temps):

    # message = equation(ws, T0, Ta, intensite)
    # print(message)

    tracker = OfflineEmissionsTracker(country_iso_code="FRA")
    tracker.start()

    message = increment(T0, ws, Ta, intensite,temps)
    # print(message)

    tracker.stop()

    emissionData = tracker.final_emissions_data

    data_array = {}
    data_array['carbon_emission'] = emissionData.energy_consumed * 60
    data_array['energy_consumed'] = emissionData.energy_consumed
    data_array['duration_seconds'] = emissionData.duration
    data_array['data_point'] = message

    return data_array

if __name__ == "__main__":

    ws = float(input("Entrez ws :\n"))
    #Tc = float(input("Entrez Tc :\n"))
    Ta = float(input("Entrez Ta :\n"))
    intensite = float(input("Entrez l'intensite :\n"))
    T0 = float(input("Entrez votre température initiale :\n"))
    temps = int(input("Combien de temps :\n")) 

    message = calculTemp(T0, ws, Ta, intensite,temps)
    print(message)