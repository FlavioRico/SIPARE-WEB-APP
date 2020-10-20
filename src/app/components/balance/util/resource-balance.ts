import { Summary } from '../../models/models-balance/summary';
import { Comparsion } from '../../models/models-balance/comparison';
import { Renderer2, ElementRef, } from '@angular/core';
export class ResourceBalance {

    constructor(
        private render: Renderer2
    ) {}
    
    setMessageValidacion (
        balanced: boolean, 
        t24Amounts: Summary, 
        btnAutorizar: ElementRef,
        messageValidacion: ElementRef,
        icons: ElementRef[]) {

        let saldosToday = t24Amounts.total;
        if (saldosToday === 0) {
          this.createMessage('alert-warning', 'Advertencia. No hay archivos de T-24 del día actual.', messageValidacion);
          this.render.setStyle(btnAutorizar.nativeElement, 'display', 'none');
          this.setIconsWarning(icons);
          return 1;
        }
    
        if (!balanced) {
          this.createMessage('alert-danger', 'Atención. Inconsistencia en los saldos.', messageValidacion);
          this.render.setStyle(btnAutorizar.nativeElement, 'display', 'none');
          return 0;
        }
    
        if (balanced) {
          this.createMessage('alert-success', 'Los saldos cuadran correctamente.', messageValidacion);
          return 0;
        }
    }

    createMessage (
        classMessage: string, 
        textMessage: string, 
        messageValidacion: ElementRef) {

        this.render.addClass(
            messageValidacion.nativeElement,
            classMessage
        );
        const div = this.render.createElement('div');
        const textValid = this.render.createText(
            textMessage
        );
        this.render.appendChild(div, textValid);
        this.render.appendChild(
            messageValidacion.nativeElement, div
        );
    }

    validationChangeIcons (
        comparison: Comparsion, 
        iconCompACV: ElementRef, 
        iconCompRCV: ElementRef, 
        iconCompTotal: ElementRef) {
        let iconErr = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/> <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/></svg>';
        let iconOk = '<svg #iconVerifyRCV width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle icon-verify-ok" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/> </svg>';
        if (comparison.vivienda_acv_imss_equality === true) {
            this.changeIcons(iconCompACV, 'icon-verify-error', 'icon-verify-ok', iconOk);
        } else this.changeIcons(iconCompACV, 'icon-verify-ok', 'icon-verify-error', iconErr);
        
        if (comparison.rcv_equality === true) {
            this.changeIcons(iconCompRCV, 'icon-verify-error', 'icon-verify-ok', iconOk);
        } else this.changeIcons(iconCompRCV, 'icon-verify-ok', 'icon-verify-error', iconErr);
        
        if (comparison.total_equality === true) {
            this.changeIcons(iconCompTotal, 'icon-verify-error', 'icon-verify-ok', iconOk);
        } else this.changeIcons(iconCompTotal, 'icon-verify-ok', 'icon-verify-error', iconErr);
    }

    changeIcons(
        icon: ElementRef, oldClassIcon: string, 
        newClassIcon: string, 
        newIcon: string){

        this.render.removeClass(icon.nativeElement, oldClassIcon);
        this.render.addClass(icon.nativeElement, newClassIcon);
        this.render.setProperty(icon.nativeElement, 'innerHTML', newIcon);
    }

    setIconsWarning (iconos: ElementRef[]) {
        // const iconos = [this.iconCompACV, this.iconCompRCV, this.iconCompTotal];
        const newIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/> </svg>';
        for (let i = 0; i < iconos.length; i++) {
          this.render.removeClass(iconos[i].nativeElement, 'icon-verify-ok');
          this.render.removeClass(iconos[i].nativeElement, 'icon-verify-error');
          this.render.addClass(iconos[i].nativeElement, 'icon-verify-warning');
          this.render.setProperty(iconos[i].nativeElement, 'innerHTML', newIcon);
        }
    }

    setT24Amounts(
        t24Amounts: Summary, valueT2RCV: number,
        valueT1RCV: number, totalAuxiliares: number) {

        console.log('debug interno',t24Amounts);
        
        valueT2RCV = t24Amounts.rcv;
        valueT1RCV = t24Amounts.vivienda_acv_imss;
        totalAuxiliares = t24Amounts.total;
    }
    
    setFileAmounts (
        fileAmounts: Summary, valueRCV: number, 
        valueIMSSACV: number, totalArchivo: number) {
        
        valueRCV = fileAmounts.rcv;
        valueIMSSACV = fileAmounts.vivienda_acv_imss;
        totalArchivo = fileAmounts.total;
    }

    format(
        RCVformated: any,
        T2RCVformated: any,
        IMSSACVformated: any,
        T1ACVformated: any,
        totalArchivoformated: any,
        totalAuxiliaresformated: any,
        valueRCV: number,
        valueT2RCV: number,
        valueIMSSACV: number,
        valueT1RCV: number,
        totalArchivo: number,
        totalAuxiliares: number) {

        RCVformated = this.formatTable(valueRCV);
        T2RCVformated = this.formatTable(valueT2RCV);
        IMSSACVformated = this.formatTable(valueIMSSACV);
        T1ACVformated = this.formatTable(valueT1RCV);
        totalArchivoformated = this.formatTable(totalArchivo);
        totalAuxiliaresformated = this.formatTable(totalAuxiliares);
    }

    formatTable(valTable){
        return ('$' + new Intl.NumberFormat('en-US').format(valTable));
    }

    authSucess(
        btnAutorizar: ElementRef,
        messageValidacion: ElementRef
    ) {
        
        this.render.setStyle(btnAutorizar.nativeElement, 'display', 'none');
        this.render.setProperty(messageValidacion.nativeElement, 'innerHTML',
        'Autorización realizada');
    }
}