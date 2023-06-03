import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class Alerts {

    private static toastController: ToastController = new ToastController();

    static async showToast(
        message: string,
        duration: number = 1500,
        position: 'top' | 'middle' | 'bottom' = 'top',
        mode: 'normal' | 'success' | 'warning' = 'normal'
    ) {
        const toast = await this.toastController.create({
            message,
            duration,
            position,
            icon: this.getIcon(mode)
        });
        await toast.present();
    }

    static showNetworkErrorToast() {
        this.showToast(
            'Connection lost!. Check your internet connection or try again later',
            2000,
            'top',
            'warning'
        );
    }

    private static getIcon(mode: 'normal' | 'success' | 'warning'): string {
        if (mode == 'success') {
            return "checkmark-circle-outline";
        }
        if (mode == 'warning') {
            return "alert-circle-outline";
        }
        return "";
    }

}
