import { createSelector } from "@reduxjs/toolkit";

const selectJurnalGuru = (state) => state.jurnalGuru;
const selectGuru = (state) => state.teacher;
const selectKelas = (state) => state.kelas;
const selectMapel = (state) => state.mapel;
const selectProfile = (state) => state.profile;
const selectStored = (state) => state.stored;

export const selectDataStored = createSelector(
    [selectStored],
    (stored) => stored.data
    );
export const selectLoadingStored = createSelector(
    [selectStored],
    (stored) => stored.loading
    );
export const selectErrorStored = createSelector(
    [selectStored],
    (stored) => stored.error
    );


export const selectDataJurnalGuru = createSelector(
    [selectJurnalGuru],
    (jurnalGuru) => jurnalGuru.data
    );
export const selectLoadingJurnalGuru = createSelector(
    [selectJurnalGuru],
    (jurnalGuru) => jurnalGuru.loading
    );
export const selectErrorJurnalGuru = createSelector(
    [selectJurnalGuru],
    (jurnalGuru) => jurnalGuru.error
    );

export const selectDataGuru = createSelector(
    [selectGuru],
    (teacher) => teacher.data
    );

export const selectDataKelas = createSelector(
    [selectKelas],
    (kelas) => {
        console.log(kelas.data, "<<<<<<<<<<<<<<<SELECTOR KELAS")
        return kelas.data}
    );
export const selectLoadingKelas = createSelector(
    [selectKelas],
    (kelas) => kelas.loading
    );
export const selectErrorKelas = createSelector(
    [selectKelas],
    (kelas) => kelas.error
    );

export const selectDataMapel = createSelector(
    [selectMapel],
    (mapel) => mapel.data
    );

export const selectDataProfile = createSelector(
    [selectProfile],
    (profile) => profile.data
    );
export const selectLoadingProfile = createSelector(
    [selectProfile],
    (profile) => profile.loading
    );
export const selectRoleProfile = createSelector(
    [selectProfile],
    (profile) => profile.role
    );
