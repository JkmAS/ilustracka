/**
 * Object messages with all messages for user interaction
 *
 * Normal alert messages are (info, alert, error, success)
 * Information massage with manual is (message)
 * Generated messages are (loading, info, alert, error, success)
 */
export const messages = {
    login_no_password: {type: "info", text: "Musíte zadat heslo"},
    login_mail_bad_format: {type: "info", text: "Musíte zadat iListí mail ve správném formátu"},
    login_fail: {type: "error", text: "Špatné přihlašovací údaje"},
    login_info: {type: "message", text: "Jako přihlašovací údaje použijte standardní použivané. Jedná se o redakční mail a využívané heslo. V případě neznalosti napište mail na redakci či na jkmasg@gmail.com"},
    upload_success: {type: "success", text: "Soubor úspěšně nahrán. Pod tlačítkem pro nahrání jsou zobrazeny obrázky, u kterých je nutné vyplnit potřebné údaje"},
    file_name_bad_format: {type: "error", text: "Název obrázku nesmí být prázdný"},
    file_tags_bad_format: {type: "error", text: "Tagy obrázku nesmí být nevyplněny, oddělujeme čárkou"},
    upload_success_completed: {type: "success", text: "Úspěšně uložen název a tagy obrázku"},
    ai_error: {type: "error", text: "Automatické generování tagů selhalo"},
    ai_empty: {type: "info", text: "Generování tagů nenalezlo odpovídající tagy"},
    manual: {type: "message", text: "Dotazy lze upřesňovat pomocí speciálních výrazů, jejichž tvorba odpovídá pravidlům tvorby Regexů. "+
                                    "ZNAK .	odpovídá libovolnému znaku PŘÍKLAD: k.s odpovídá kus, kos, k2s. "+
                                    "ZNAK ?	minimálně 0x, maximálně 1x PŘÍKLAD ku?s odpovídá právě ks a kus. "+
                                    "ZNAK +	minimálně 1x, maximálně neomezeně krát PŘÍKLAD halo+ odpovídá halo, halooo. "+
                                    "ZNAK |	odděluje několik dílčích výrazů	PŘÍKLAD ahoj|nazdar odpovídá právě jednomu z pozdravů. "+
                                    "ZNAK | v () odděluje několik dílčích subvýrazů PŘÍKLAD a(b|c) odpovídá právě ab a ac. "},
    clipboard_success: {type: "success", text: "Zkopírováno do schránky"},
    clipboard_not_supported: {type: "info", text: "Váš prohlížeč nepodporuje tuto funkci"},
    mail_success: {type: "success", text: "Mail úspěšně odeslán"},
    mail_error: {type: "error", text: "Odeslání mailu selhalo"},
    mail_bad_format: {type: "error", text: "Mail nezadán, nebo byl zadán ve špatném formátu"},
    update_success: {type: "success", text: "Obrázek úspěšně změněn"},
    remove_success: {type: "success", text: "Obrázek úspěšně smazán z databáze"},
    backed_up_error: {type: "error", text: "Vytváření záloh selhalo"},
    everything_backed_up: {type: "info", text: "Vše je zazálohováno :)"},
    backed_up_success: {type: "success", text: "Záloha úspěšně vytvořena do ZIP archivu"},
    backed_up_zip_error: {type: "error", text: "Vytváření ZIP archivu selhalo"},
};